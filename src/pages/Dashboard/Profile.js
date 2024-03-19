import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { handleDeleteAccount } from "../../Firebase/config.js";
import { getUser } from "../../utils/getUser.js";
import './css/profile.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useNavigate();

    useEffect(() => {
        const fetchedUser = localStorage.getItem('userId');
        if (fetchedUser) {
            getUser(fetchedUser)
                .then((userData) => {
                    if (userData) {
                        setUser(userData);
                    } else {
                        console.log('User not found');
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.log('Error fetching user data:', error);
                    setLoading(false);
                });
        } else {
            history('/login');
        }
    }, []);

    const handleDeleteUserAccount = () => {
        handleDeleteAccount();
        history('/signup');
    }

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
                            <p>KYC: {user.kycDone ? "Done" : "Not Done"}</p>
                            <i className={user.kycDone ? "fas fa-check" : "fas fa-hourglass"}></i>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <p> Referral Code - {user.referralCode}</p>
                            <i className="fas fa-handshake"></i>
                        </div>
                        {/* Add similar sections for other user data */}
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button className="btn btn-danger me-md-2" onClick={handleDeleteUserAccount}>
                                Delete Account
                            </button>
                            <button className="btn btn-primary">
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
