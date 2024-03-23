import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { handleDeleteAccount } from "../../Firebase/config.js";
import { getUser } from "../../utils/getUser.js";
import './css/profile.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
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
        if (window.confirm('Are you sure you want to delete your account?')) {
            handleDeleteAccount()
                .then(() => {
                    localStorage.removeItem('userId');
                    history('/login');
                })
                .catch((error) => {
                    console.log('Error deleting user account:', error);
                });
        }
    }

    const copyReferralCode = () => {
        navigator.clipboard.writeText(user.referralCode);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    const handleShareToSocialMedia = (platform) => {
        let shareUrl = `https://your-app.com/referral/${user.referralCode}`;
        window.open(shareUrl, '_blank');
    };

    return (
        <div className="container mt-5">
            <div className="profile-card">
                <h1 className="text-center mb-4">Profile Page</h1>
                {loading ? (
                    <p className="text-center">Loading user data...</p>
                ) : user ? (
                    <div>
                        <ProfileItem label="Email" value={user.email} iconClass="fas fa-envelope" />
                        <ProfileItem label="Name" value={user.name} iconClass="fas fa-user" />
                        <ProfileItem label="Phone" value={user.phone} iconClass="fas fa-phone" />
                        <ProfileItem label="Address" value={user.address} iconClass="fas fa-map-marker-alt" />
                        <ProfileItem label="KYC" value={user.kycDone ? "Done" : "Not Done"} iconClass="fas fa-check-circle" />
                        <div className="profile-item">
                            <p> <i className='fas fa-handshake'></i>  Referral Code:  <span>{user.referralCode}</span>
                            <span className="icon" onClick={copyReferralCode}>
                                {copied ? <i className="fas fa-check-circle"></i> : <i className="far fa-copy"></i>}
                            </span> <span onClick={handleShareToSocialMedia}> <i className='fa fa-share'></i> </span> </p>
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                            <ActionButton onClick={handleDeleteUserAccount} text="Delete Account" iconClass="fas fa-trash" color="danger" />
                            <ActionButton to="/updateinfo" text="Update Info" iconClass="fas fa-edit" color="blue" />
                        </div>
                    </div>
                ) : (
                    <p className="text-center">No user data found.</p>
                )}
            </div>
        </div>
    );
};

const ProfileItem = ({ label, value, iconClass }) => (
    <div className="profile-item">
        <p><i className={iconClass}></i>   {label}: <span>  {value}  </span></p>
    </div>
);


const ActionButton = ({ onClick, to, iconClass, text, color }) => (
    <button className={`btn btn-${color} me-2`} onClick={onClick}>
        <i className={iconClass}></i>
        {to ? <Link to={to} className="ms-2">{text}</Link> : <span className="ms-2">{text}</span>}
    </button>
);


export default ProfilePage;
