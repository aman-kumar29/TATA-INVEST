import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../Firebase/config';
import { useNavigate } from 'react-router-dom';


const UpdateInfoPage = () => {
  const [newName, setNewName] = useState('');
  const [previousName, setPreviousName] = useState('');
  const history = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setPreviousName(userData.name || '');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpdateName = async () => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { name: newName });
      console.log('User name updated successfully!');
      history('/profile');
    } catch (error) {
      console.error('Error updating user name:', error);
    }
  };

  return (
    <div>
      <h1>Update Information</h1>
      <label htmlFor="newName">New Name:</label>
      <input
        type="text"
        id="newName"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder={previousName} // Display previous name as placeholder
      />
      <button onClick={handleUpdateName}>Update Name</button>
    </div>
  );
};

export default UpdateInfoPage;
