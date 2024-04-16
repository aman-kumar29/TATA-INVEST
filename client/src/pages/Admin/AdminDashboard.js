import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Skeleton from './Skeletons/SkeletonAdmin.js';
import './admin.css';

export default function AdminDashboard() {
    const [usersData, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state
    const history = useNavigate();

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const response = await axios.get(`/api/getAllUsers`);
                const filtered = response.data.filter(user => (user.phone !== "7976189199" || user.phone === '1111111111'));
                const sortedUsers = filtered.sort((a, b) => {
                    const dateA = new Date(a.createdAt._seconds * 1000);
                    const dateB = new Date(b.createdAt._seconds * 1000);
                    return dateB - dateA; // Sort in descending order (newest first)
                });

                setUsers(sortedUsers);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUsers([]);
                setLoading(false); // Set loading to false even if there's an error
            }
        };

        fetchUsersData();
    }, []);

    const currentDate = new Date();

    const differenceInDays = (date1, date2) => {
        const diffInTime = date2.getTime() - date1.getTime();
        return diffInTime / (1000 * 3600 * 24);
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    };

    // Render Skeleton while loading
    if (loading) return <Skeleton />;

    return (
        <div className="container">
            <h1 className='text-center mt-5 my-5'>USERS - {usersData.length}</h1>
            {
                usersData.length === 0 ? (
                    <h5>
                        No user in data !
                    </h5>
                ) : (
                    <div className='my-5'>
                        <ul className="list-group">
                            {usersData.map((user, index) => {
                                const userCreatedAt = new Date(user.createdAt._seconds * 1000);
                                const daysSinceCreation = differenceInDays(userCreatedAt, currentDate);
                                const isNewUser = daysSinceCreation < 7;

                                return (
                                    <li
                                        key={index}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div>
                                            <span>{index + 1} .  {user.name}</span>
                                            <br />
                                            <small className="text-muted">₹ {user.investedAmount} Invested</small>
                                        </div>
                                        <div>
                                            {isNewUser && (
                                                <span className="badge bg-success me-2">New</span>
                                            )}
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => handleUserClick(user)}
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )
            }

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <div className='details'>
                            <h5>Personal Details</h5>
                            <hr />
                            <p>Registration Date : {formatDate(new Date(selectedUser.createdAt._seconds * 1000))}</p>
                            <p>Name : {selectedUser.name}</p>
                            <p>KYC : {selectedUser.kycDone ? "DONE" : "NOT DONE"}</p>
                            {selectedUser.kycDone && <p>Document : <a className='btn btn-success' href={selectedUser.documentUrl} download target="_blank">
                                Download PDF
                            </a></p>}
                            <br />
                            <h5>Contact Details</h5>
                            <hr />
                            <p>Phone : {selectedUser.phone}</p>
                            <br />
                            <h5>Investment Details</h5>
                            <hr />
                            <p>Invested Amount : ₹ {selectedUser.investedAmount}</p>
                            <p>Investment Transactions :</p>
                            {selectedUser.investmentTransactions && selectedUser.investmentTransactions.length > 0 ? (
                                <table className="table table-responsive my-3">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sr. No.</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Transaction ID</th>
                                            <th scope="col">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedUser.investmentTransactions.map((transaction, index) => {
                                            const date = new Date(transaction.date._seconds * 1000);
                                            const formatedDate = formatDate(date);
                                            return (
                                                <tr key={index} className="profile-card">
                                                    <td>{index + 1}.</td>
                                                    <td>₹ {transaction.amount}</td>
                                                    <td>{transaction.transactionId.substring(0, transaction.transactionId.length / 2) + ' ' + transaction.transactionId.substring(transaction.transactionId.length / 2)}</td>
                                                    <td>{formatedDate}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="mx-3">No investment transactions available</p>
                            )}
                            <br />
                            <h5>Income Details</h5>
                            <hr />
                            <p>Interest Amount : ₹ {selectedUser.interestAmount}</p>
                            <p>Referral Amount : ₹ {selectedUser.referralAmount}</p>
                            <p>Lifetime Income : ₹ {selectedUser.interestAmount + selectedUser.referralAmount}</p>
                            <p>Withdrawable Amount : ₹ {selectedUser.withdrawableAmount}</p>
                            <br />
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        console.log(selectedUser);
                        history(`/edit-user/${selectedUser.referralCode}`)
                    }}>
                        Edit Details
                    </Button>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
