import React, { useState, useEffect } from 'react';
import { auth, db, handleDeleteAccount } from "../../Firebase/config.js";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import './css/profile.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);

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
                        setLoading(false);
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
        <div className="container mt-5 my-5">
        <div className="card shadow p-4 profile-card">
            <h1 className="text-center mb-4">Profile Page</h1>
            {loading ? (
                <p className="text-center">Loading user data...</p>
            ) : user ? (
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <p>Email: {user.email}</p>
                        <i className="fas fa-envelope"></i>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <p>Name: {user.name}</p>
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <p>Phone: {user.phone}</p>
                        <i className="fas fa-phone"></i>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <p>Address: {user.address}</p>
                        <i className="fas fa-location"></i>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <p>KYC: {user.kycDone?"Done":"Not Done"}</p>
                        <i className= {user.kycDone?"fas fa-check":"fas fa-hourglass"}></i>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <p> Referral Code - {user.referralCode}</p>
                        <i className= "fas fa-handshake"></i>
                    </div>
                    {/* Add similar sections for other user data */}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                         <button className="btn btn-danger me-md-2" onClick={handleDeleteUserAccount}>
                            Delete Account
                        </button>
                        <button className="btn btn-primary" >
                            <Link to="/updateinfo" className="text-white">Update Info</Link>
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center">No user data found.</p>
            )}
        </div>
    </div>
    );
};

export default ProfilePage;
