// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserSessionPersistence, deleteUser } from "firebase/auth";
import { getFirestore, setDoc, addDoc, doc, getDoc, deleteDoc,query, where, collection, getDocs,updateDoc} from "firebase/firestore";
import { getStorage  } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC_Tcx4yIyJCfJK6VhpHRM8Vq9TRKK6dgU",
  authDomain: "tatainvest-71bd6.firebaseapp.com",
  projectId: "tatainvest-71bd6",
  storageBucket: "tatainvest-71bd6.appspot.com",
  messagingSenderId: "1022642675405",
  appId: "1:1022642675405:web:2eebe654aa302eb17e9384",
  measurementId: "G-TR5BYENGCZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable persistence 
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Session persistence enabled");
  })
  .catch((error) => {
    console.error("Error enabling session persistence:", error);
  });

export { auth };


export const createUserDocument = async (user, name, parentReferralCode,phone,address) => {
  if (!user) return;
  console.log(user.uid);
  try {
    await setDoc(doc(db, "users", user.uid),
      {
        name: name,
        email: "",
        phone: phone,
        address: address,
        investedAmount: 0,
        referralCode: user.uid,
        parentReferralCode: parentReferralCode,
        referralAmount: 0,
        interestAmount: 0,
        withdrawableAmount: 0,
        investmentTransactions: [],
        withdrawalTransactions: [],
        kycDone: false,
        referralUsers: [],
        createdAt: new Date(),
        documentUrl: ''
      });

    console.log("User document created successfully!");
  } catch (error) {
    console.log('Error in creating user', error);
  }
}
export const createUserDocumentFast2SMS = async (userId, name, parentReferralCode,phone,address) => {
  if (!userId) return;
  try {
    await setDoc(doc(db, "users", userId),
      {
        name: name,
        email: "",
        phone:phone,
        address: address,
        investedAmount: 0,
        referralCode: userId,
        parentReferralCode: parentReferralCode,
        referralAmount: 0,
        interestAmount: 0,
        withdrawableAmount: 0,
        investmentTransactions: [],
        withdrawalTransactions: [],
        kycDone: false,
        referralUsers: [],
        createdAt: new Date(),
        documentUrl: ''
      });
      if(parentReferralCode !== "")  {  
        const parentRef = doc(db, 'users', parentReferralCode);
        await updateParentReferralArray(parentRef, userId);  
      }

    console.log("User document created successfully!");
  } catch (error) {
    console.log('Error in creating user', error);
  }
}
const updateParentReferralArray = async (parentRef, childId) => {
  try {
    const parentRefDoc = await getDoc(parentRef);
    if (parentRefDoc.exists()) {
      const parentData = parentRefDoc.data();
      const referralUsersArray = parentData.referralUsers || [];
      if (!referralUsersArray.includes(childId)) {
        referralUsersArray.push(childId);
        await updateDoc(parentRef, { referralUsers: referralUsersArray });
        console.log("Parent referralUsers array updated successfully!");
      }
    } else {
      console.log("Parent document not found");
    }
  } catch (error) {
    console.error("Error updating parent referralUsers array:", error);
  }
}


export const getSingleUser = async (uid) => {
  // Wait until auth.currentUser is available
  while (!auth.currentUser) {
    // Wait for a short interval before checking again
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Once auth.currentUser is available, fetch the user data
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data returned successfully");
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
};

export default getSingleUser;



export const handleDeleteAccount = async () => {
  const currentUser = auth.currentUser;

  if (currentUser) {
    try {
      await deleteUser(currentUser);
      const userRef = doc(db, "users", currentUser.uid);
      await deleteDoc(userRef);

      console.log('User account deleted successfully!');
    } catch (error) {
      console.error('Error deleting user account:', error);
    }
  } else {
    console.warn('No user is signed in');
  }
};

export const checkUserExists = async (phone) => {
  try {
    // Create a query to check if a user with the given phone number exists
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('phone', '==', phone));

    // Execute the query
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // Get the first document (assuming phone numbers are unique)
      const doc = querySnapshot.docs[0].data();
      // Return the referral code if available
      return doc.referralCode;
    } else {
      // If no user found, return empty string
      return '';
    }
    // Return true if a user with the given phone number exists, otherwise false
    // return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw error;
  }
};




export const createPaymentApprovalRequest = async (userId, userName, phone, amount) => {
  try {
    await addDoc(collection(db, "paymentApprovalRequests"),
      {
        userId: userId,
        name: userName,
        phone: phone,
        amount: amount,
        status: 'pending',
        createdAt: new Date()
      });

    console.log("Payment approval request created successfully!");
  } catch (error) {
    console.log('Error in creating payment approval request', error);
  }
}

export const createWithdrawalApprovalRequest = async (userId, userName, phone, amount, accountNumber, ifscCode, cardholderName) => {
  try {
    await addDoc(collection(db, "withdrawalApprovalRequests"),
      {
        userId: userId,
        name: userName,
        phone: phone,
        UPI_ID: "",
        amount: amount,
        status: 'pending',
        accountNumber:accountNumber,
        ifscCode:ifscCode,
        cardholderName:cardholderName,
        createdAt: new Date()
      });

    console.log("Withdrawl approval request created successfully!");
  } catch (error) {
    console.log('Error in creating Withdrawl approval request', error);
  }
}


export const updateDocumentUrlsAndBankDetails = async (userId, downloadURL1,documentURL2,accountNumber, ifscCode, cardholderName) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      documentUrl: downloadURL1,
      documentUrl2:documentURL2,
      accountNumber:accountNumber,
      ifscCode:ifscCode,
      cardholderName:cardholderName,
      kycDone: true
    });

    console.log('Document URL updated successfully');
  } catch (error) {
    console.error('Error updating document URL:', error);
  }
}