import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Firebase/config.js';

const EditUserDetails = () => {
    const { referralCode } = useParams();
    const [userData, setUserData] = useState(null);
    const [newUserData, setNewUserData] = useState({
        name: '',
        phone: '',
        address: '',
        investedAmount: '',
        interestAmount: '',
        referralAmount: '',
        withdrawableAmount: ''
    });

    const history = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', referralCode));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserData(userData);
                    setNewUserData(userData);
                } else {
                    console.error('User not found');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserData();
    }, [referralCode]);

    const handleUpdateInfo = async () => {
        try {
            console.log("newuserData",newUserData);
            const userRef = doc(db, 'users', referralCode);
            await updateDoc(userRef, newUserData);
            console.log('User info updated successfully!');
            history('/admin-dashboard'); // Redirect to admin dashboard after updating user details
            console.log("newuserData",newUserData);
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    if (!userData) return <p>Loading...</p>;

    return (
        <div className="edit-user-container">
            <h1>Edit User Details</h1>
            <table className="user-details-table">
                <tbody>
                    {Object.entries(userData).map(([key, value]) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>
                                <input
                                    type="text"
                                    name={key}
                                    value={newUserData[key]}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleUpdateInfo}>Update Info</button>
        </div>
    );
};

export default EditUserDetails;
