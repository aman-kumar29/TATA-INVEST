import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
    const [usersData, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/getAllUsers`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUsers([]);
            }
        };

        fetchUsersData();
    }, []);

    const handleEditUser = (userId) => {
        // Add your logic to handle editing user
        console.log('Edit user:', userId);
    };

    const handleDeleteUser = (userId) => {
        // Add your logic to handle deleting user
        console.log('Delete user:', userId);
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <h2>All Users</h2>
                <ul>
                    {usersData.map(user => (
                        <li key={user.id} onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
                            <span>{user.name}</span>
                            <button onClick={() => handleEditUser(user.id)}>Edit</button>
                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            {selectedUser && (
                <div>
                    <h2>User Details</h2>
                    <p>Name: {selectedUser.name}</p>
                    <p>Invested Amount: {selectedUser.investedAmount}</p>
                    {/* Add other user details here */}
                </div>
            )}
        </div>
    )
}
