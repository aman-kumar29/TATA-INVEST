const express = require('express');
const admin = require('firebase-admin'); // Using firebase@9
const cron = require('node-cron');
const moment = require('moment');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// Initialize Firebase Admin SDK with service account credentials (replace with your actual values)
admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccount.json')),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
});

const firestore = admin.firestore();

// Daily update task (using async/await)
async function updateInterestAmounts() {
    const batch = firestore.batch();
  
    try {
      const usersRef = firestore.collection('users');
      const usersSnapshot = await usersRef.get();
  
      usersSnapshot.forEach((doc) => {
        const investedAmount = doc.data().investedAmount;
        const currentInterestAmount = doc.data().interestAmount || 0; // Handle initial value
        const interestUpdate = investedAmount * 0.012; // Calculate interest increase for a day
        const currentWithdrawableAmount = doc.data().withdrawableAmount || 0; // Handle initial value

        const newInterestAmount = currentInterestAmount + interestUpdate;
        const newWithdrawableAmount = currentWithdrawableAmount + interestUpdate;
        console.log(`Updating interest amount for ${doc.data().name}: ${currentInterestAmount} -> ${newInterestAmount}`);
        batch.set(doc.ref, {
           interestAmount: newInterestAmount,
            withdrawableAmount: newWithdrawableAmount, 
          }, { merge: true });
      });
  
      await batch.commit();
      console.log('Interest amounts updated successfully!');
    } catch (error) {
      console.error('Error updating interest amounts:', error);
    }
}

async function updateInvestedAmount() {
  try {
    // Get all users from the database
    const usersSnapshot = await firestore.collection('users').get();

    // Iterate through each user
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const userId = userDoc.id;
      const { investedAmount, investmentTransactions } = userData;

      let updatedInvestedAmount = investedAmount;
      let updatedTransactionsArray = investmentTransactions;

      // Iterate through each investment transaction
      for (const transaction of updatedTransactionsArray) {
        // Check if the transaction is older than 1 year
        const transactionDate = moment(transaction.date.toDate());
        const oneYearAgo = moment().subtract(1, 'day');

        if (transactionDate.isBefore(oneYearAgo) && !transaction.investedAmountUpdated) {
          // Subtract the transaction amount from the invested amount
          updatedInvestedAmount -= transaction.amount;

          // Update the transaction in the investmentTransactions array
          const updatedTransactions = updatedTransactionsArray.map((t) => {
            if (t.transactionId === transaction.transactionId) {
              return { ...t, investedAmountUpdated: true };
            }
            return t;
          });

          updatedTransactionsArray = updatedTransactions; 

          // Update the user document in Firestore
          await firestore.collection('users').doc(userId).update({
            investedAmount: updatedInvestedAmount,
            investmentTransactions: updatedTransactions,
          });

        }
      }
    }

    console.log('InvestedAmount updated successfully');
  } catch (error) {
    console.error('Error updating investedAmount:', error);
  }
}



// Schedule update using cron library (replace with your chosen scheduler)
// Use a suitable scheduler library for production
const task = cron.schedule('*/15 * * * *', updateInterestAmounts); // Runs at midnight daily (for testing)

// Optional: Start the scheduled task immediately for testing purposes (comment out for production)
task.start();

// Schedule update using cron library (replace with your chosen scheduler)
// Use a suitable scheduler library for production
const task_2 = cron.schedule('0 0 */7 * *', updateInvestedAmount);

// Optional: Start the scheduled task immediately for testing purposes (comment out for production)
task_2.start();


// For Checking 

app.get('/updateInvestedAmount', async  (req, res)  => {
  try {
    await updateInvestedAmount();
    res.send('Update investedAmount triggered (simulated)');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error triggering update investedAmount');
  }
});

app.get('/update', async  (req, res)  => {
  try {
    await updateInterestAmounts();
    res.send('Update triggered (simulated)');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error triggering update');
  }
});
app.get('/', (req, res)  => {
    res.send('Server service running');
});


// Start the server with Nodemon for automatic restarts during development
app.listen(port, () => console.log(`Server listening on port ${port}`));
