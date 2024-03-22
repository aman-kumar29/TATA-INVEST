import express from 'express';
import admin from 'firebase-admin'; // Using firebase@9
import cron from 'node-cron';
import moment from 'moment';
import cors from 'cors';
import morgan from 'morgan';
import parentReferralRoutes from './routes/parentReferralRoutes.js';
import dotenv from 'dotenv';
// import serviceAccount from './serviceAccount.js';

dotenv.config();
 
const app = express();
const port = process.env.PORT || 8000;

// Initialize Firebase Admin SDK with service account credentials (replace with your actual values)
admin.initializeApp({
  credential: admin.credential.cert({
    "type": process.env.TYPE,
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri":  process.env.TOKEN_URI,
    "auth_provider_x509_cert_url":  process.env.AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
    "universe_domain": process.env.UNIVERSE_DOMAIN
  }),
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
const task = cron.schedule('*/30 * * * *', updateInterestAmounts); // Runs at midnight daily (for testing)
const task_2 = cron.schedule('0 0 */7 * *', updateInvestedAmount);

// Optional: Start the scheduled task immediately for testing purposes (comment out for production)
task.start();
task_2.start();


// For Checking 

// app.get('/updateInvestedAmount', async  (req, res)  => {
//   try {
//     await updateInvestedAmount();
//     res.send('Update investedAmount triggered (simulated)');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error triggering update investedAmount');
//   }
// });

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", parentReferralRoutes);
 
// app.get('/update', async  (req, res)  => {
//   try {
//     await updateInterestAmounts();
//     res.send('Update triggered (simulated)');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error triggering update');
//   }
// });

app.get('/', (req, res)  => {
    res.send('Server service running');
});


// Start the server with Nodemon for automatic restarts during development
app.listen(port, () => console.log(`Server listening on port ${port}`));
