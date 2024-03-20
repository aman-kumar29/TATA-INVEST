// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserSessionPersistence, deleteUser } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc, deleteDoc} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_Tcx4yIyJCfJK6VhpHRM8Vq9TRKK6dgU",
  authDomain: "tatainvest-71bd6.firebaseapp.com",
  projectId: "tatainvest-71bd6",
  storageBucket: "tatainvest-71bd6.appspot.com",
  messagingSenderId: "1022642675405",
  appId: "1:1022642675405:web:2eebe654aa302eb17e9384",
  measurementId: "G-6DPQ2X6M6Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export const db = getFirestore(app);

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
        email: user.email,
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
        createdAt: new Date()
      });

    console.log("User document created successfully!");
  } catch (error) {
    console.log('Error in creating user', error);
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
