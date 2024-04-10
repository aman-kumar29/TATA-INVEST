import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import './admin.css';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase/config.js';
import { useNavigate } from 'react-router-dom';

export default function WithdrawalRequest() {
    const [withdrawalRequests, setWithdrawalRequests] = useState([]);
    const [selectedWithdrawalRequest, setSelectedWithdrawalRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        const fetchWithdrawalRequests = async () => {
            try {
                const response = await axios.get(`/api/getAllWithdrawalRequests`);
                const sortedWithdrawalRequests = response.data.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA; // Sort in descending order (newest first)
                });

                setWithdrawalRequests(sortedWithdrawalRequests);
            } catch (error) {
                console.error('Error fetching withdrawal requests:', error);
                setWithdrawalRequests([]);
            }
        };

        fetchWithdrawalRequests();
    }, []);

    const handleAccept = async (userId, amount, request) => {
        // Implement logic for accepting withdrawal request
        let balance = -1 * Number(amount);
        try {
            // Update the status to "accepted" in Firestore
            await updateDoc(doc(db, 'withdrawalApprovalRequests', request.id), {
                status: 'accepted'
            });
            const userRef = doc(db, 'users', userId);
            const userSnapshot = await getDoc(userRef);
            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                balance += userData.withdrawableAmount; // Subtracting from existing balance
                await updateDoc(userRef, {
                    withdrawableAmount: balance,
                });
                console.log('User balance updated successfully!');
            } else {
                console.error('User not found');
            }
            // Update the UI by removing the buttons and displaying "Accepted"
            setWithdrawalRequests(prevRequests => prevRequests.map(req =>
                req.id === request.id ? { ...req, status: 'accepted' } : req
            ));
        } catch (error) {
            console.error('Error updating user balance:', error);
        }
    };

    const handleReject = async (request) => {
        try {
            // Update the status to "rejected" in Firestore
            await updateDoc(doc(db, 'withdrawalApprovalRequests', request.id), {
                status: 'rejected'
            });
            // Update the UI by removing the buttons and displaying "Rejected"
            setWithdrawalRequests(prevRequests => prevRequests.map(req =>
                req.id === request.id ? { ...req, status: 'rejected' } : req
            ));
        } catch (error) {
            console.error('Error rejecting withdrawal request:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedWithdrawalRequest(null);
    };

    return (
        <div className="container">
            <h1 className='text-center mt-5 my-5'>Withdrawal Requests</h1>
            <div className='my-5'>
                <ul className="list-group">
                    {[...withdrawalRequests].sort((a, b) => {
                        // Sort by status: pending requests first, then accepted, then rejected
                        if (a.status === 'pending' && (b.status === 'accepted' || b.status === 'rejected')) return -1;
                        if (b.status === 'pending' && (a.status === 'accepted' || a.status === 'rejected')) return 1;
                        return 0;
                    }).map((request, index) => (
                        <li
                            key={request.userId}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <span>{index + 1} .  {request.name}</span>
                                <br />
                                <small className="text-muted">Amount: ₹{request.amount}</small>
                            </div>
                            <div>
                                {request.status === 'pending' && (
                                    <>
                                        <Button variant="success" className="me-2" onClick={() => handleAccept(request.userId, request.amount, request)}>Accept</Button>
                                        <Button variant="danger" onClick={() => handleReject(request)}>Reject</Button>
                                    </>
                                )}
                                {request.status === 'accepted' && (
                                    <span className="text-success">Accepted</span>
                                )}
                                {request.status === 'rejected' && (
                                    <span className="text-danger">Rejected</span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Display user details here */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
