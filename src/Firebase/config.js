// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import {getAuth, setPersistence, browserSessionPersistence} from "firebase/auth";
import { getFirestore,setDoc,doc,getDoc} from "firebase/firestore";

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


export const createUserDocument = async (userModel) => {
  if (!userModel) return;
    console.log(userModel);
    try {
      await setDoc(doc(db, "users", userModel.id),
       {
        email : userModel.email,
        name : userModel.name,
        investedAmount : userModel.investedAmount,
        referralCode : userModel.id,
        parentReferralCode : userModel.parentReferralCode,
        referralIncome : userModel.referralIncome,
        interestAmount : userModel.interestAmount,
        transactionIds : userModel.transactionIds,
        referralUsers : userModel.referralUsers,
        createdAt : userModel.createdAt,
         });

      console.log("User document created successfully!");
    } catch (error) {
      console.log('Error in creating user', error);
    }
}
export const getSingleUser = async (uid) => {
    while (!auth.currentUser) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data returned successfully");
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
};