import React, { useState, useEffect } from 'react';
import { auth, db, handleDeleteAccount } from "../../Firebase/config.js";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';



const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const history = useNavigate();
    //   const [phoneNumber, setPhoneNumber] = useState('');
    //   const [address, setAddress] = useState('');
    //   const [kycVerified, setKycVerified] = useState(false);

    useEffect(() => {
        // const unsubscribe = onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         const userRef = doc(db, 'users', user.uid);
        //         getDoc(userRef)
        //             .then((doc) => {
        //                 if (doc.exists) {
        //                     setUser(doc.data());
        //                     setEmail(doc.data().email);
        //                     //   setPhoneNumber(doc.data().phoneNumber || '');
        //                     //   setAddress(doc.data().address || '');
        //                     //   setKycVerified(doc.data().kycVerified || false);
        //                 } else {
        //                     console.log('No such document!');
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.log('Error getting document:', error);
        //             });
        //     } else {
        //         setUser(null);
        //     }
        // });

        // return () => unsubscribe();
        const user = localStorage.getItem('userId');
        if (user) {
            const userRef = doc(db, 'users', user);
            getDoc(userRef)
                .then((doc) => {
                    if (doc.exists) {
                        setUser(doc.data());
                        setEmail(doc.data().email);
                        //   setPhoneNumber(doc.data().phoneNumber || '');
                        //   setAddress(doc.data().address || '');
                        //   setKycVerified(doc.data().kycVerified || false);
                    } else {
                        console.log('No such document!');
                    }
                })
                .catch((error) => {
                    console.log('Error getting document:', error);
                });
        } else {
            setUser(null);
        }
    }, []);


    const handleDeleteUserAccount = () => {
        handleDeleteAccount();
        history('/signup');
    }

    //   const handleUpdateInfo = () => {
    //     const userRef = db.collection('users').doc(auth.currentUser.uid);

    //     userRef.update({
    //         name: name,
    //     //   phoneNumber: phoneNumber,
    //     //   address: address,
    //     })
    //     .then(() => {
    //       console.log('User information updated successfully!');
    //     })
    //     .catch((error) => {
    //       console.error('Error updating user information:', error);
    //     });
    //   };



    return (
        <div>
            <h1>Profile Page</h1>
            {user ? (
                <div>
                    <p>Email: {email}</p>
                    <p>Name: {user.name}</p>
                    {/* <p>Phone Number: {phoneNumber}</p>
          <p>Address: {address}</p>
          <p>KYC Verification: {kycVerified ? 'Verified' : 'Not Verified'}</p> */}
                    <button>
                        <Link to="/updateinfo">Update Info</Link>
                    </button>
                    <button onClick={handleDeleteUserAccount}>Delete Account</button>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default ProfilePage;
