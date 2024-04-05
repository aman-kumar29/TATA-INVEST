import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase/config.js';
import { useNavigate } from 'react-router-dom';


const UpdateInfoPage = () => {
  const [newName, setNewName] = useState('');
  const [previousName, setPreviousName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [previousPhone, setPreviousPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [previousAddress, setPreviousAddress] = useState('');
  const history = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setPreviousName(userData.name || '');
          setPreviousPhone(userData.phobe || '');
          setPreviousAddress(userData.address || '');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  });

  const handleUpdateInfo = async () => {
    try {
      const userRef = doc(db, 'users', userId);
      if(newName !== ''){
        await updateDoc(userRef, { 
          name: newName,
         });
      }
      if(newAddress !== ''){
        await updateDoc(userRef, { 
          address:newAddress
         });
      }
      if(newPhone !== ''){
        await updateDoc(userRef, { 
          phone:newPhone
         });
      }
      console.log('User info updated successfully!');
      history('/profile');
    } catch (error) {
      console.error('Error updating user name:', error);
    }
  };

  return (
    <div className="container mt-5 my-5">
    <h1 className="text-center">Update Information</h1>
    <div className="row justify-content-center">
        <div className="col-md-6">
            <div className="card shadow">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="newName" className="form-label">Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="newName"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder={previousName}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newPhone" className="form-label">Phone:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="newPhone"
                                value={newPhone}
                                onChange={(e) => setNewPhone(e.target.value)}
                                placeholder={previousPhone}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newAddress" className="form-label">Address:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="newAddress"
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                                placeholder={previousAddress}
                            />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleUpdateInfo}>Update Info</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default UpdateInfoPage;
