import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import './css/paymentRequests.css';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase/config.js';
import { useNavigate } from 'react-router-dom';
import { formatDate } from './FormatDate.js';

export default function PaymentRequest() {
    const [paymentRequests, setPaymentRequests] = useState([]);
    const [selectedPaymentRequest, setSelectedPaymentRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        const fetchPaymentRequests = async () => {
            try {
                const response = await axios.get(`/api/getAllPaymentRequests`);
                const sortedPaymentRequests = response.data.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA; // Sort in descending order (newest first)
                });

                setPaymentRequests(sortedPaymentRequests);
            } catch (error) {
                console.error('Error fetching payment requests:', error);
                setPaymentRequests([]);
            }
        };

        fetchPaymentRequests();
    }, []);

    const handleAccept = async (userId, amount, request) => {
        // Implement logic for accepting payment request
        let investedAmount = Number(amount);
        try {
            // Update the status to "accepted" in Firestore
            await updateDoc(doc(db, 'paymentApprovalRequests', request.id), {
                status: 'accepted'
            });
            const userRef = doc(db, 'users', userId);
            const userSnapshot = await getDoc(userRef);
            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                investedAmount += userData.investedAmount; // Adding to existing invested amount
                await updateDoc(userRef, {
                    investedAmount: investedAmount,
                });
                fetch('/send-email-addmoney-accepted', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: userData.email,
                        paidAmount: amount,
                        name: userData.name,
                        investedAmount: investedAmount,
                    }),
                }).then((res) => {
                    console.log("email-sent succesfully");
                })
                    .catch((error) => {
                        console.log("failed sending email", error);
                    })
                console.log('User info updated successfully!');
            } else {
                console.error('User not found');
            }
            // Update the UI by removing the buttons and displaying "Accepted"
            setPaymentRequests(prevRequests => prevRequests.map(req =>
                req.id === request.id ? { ...req, status: 'accepted' } : req
            ));
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    const handleReject = async (userId, amount, request) => {
        try {
            // Update the status to "rejected" in Firestore
            await updateDoc(doc(db, 'paymentApprovalRequests', request.id), {
                status: 'rejected'
            });
            // Update the UI by removing the buttons and displaying "Rejected"
            setPaymentRequests(prevRequests => prevRequests.map(req =>
                req.id === request.id ? { ...req, status: 'rejected' } : req
            ));
            const userRef = doc(db, 'users', userId);
            const userSnapshot = await getDoc(userRef);
            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                fetch('/send-email-addmoney-rejected', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: userData.email,
                        paidAmount: amount,
                        name: userData.name,
                        investedAmount: userData.investedAmount,
                    }),
                }).then((res) => {
                    console.log("email-sent succesfully");
                })
                .catch((error) => {
                    console.log("failed sending email", error);
                })
            }
        } catch (error) {
            console.error('Error rejecting payment request:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPaymentRequest(null);
    };

    return (
        <div className="payment-container">
            <h1 className='text-center mt-5 my-5'>Payment Requests</h1>
            <div>
                <ul className="payment-list-group">
                    {[...paymentRequests].sort((a, b) => {
                        // Sort by status: pending requests first, then accepted, then rejected
                        if (a.status === 'pending' && (b.status === 'accepted' || b.status === 'rejected')) return -1;
                        if (b.status === 'pending' && (a.status === 'accepted' || a.status === 'rejected')) return 1;
                        return 0;
                    }).map((request, index) => (
                        <li
                            key={request.userId}
                            className="payment-item d-flex justify-content-between align-items-center"
                        >
                            <div className="payment-item-details">
                                <span className="payment-item-name">{index + 1} .  {request.name}</span>
                                <br />
                                <small className="payment-item-amount"><i className="fas fa-rupee-sign"></i> : ₹{request.amount}</small>
                                <br />
                                <small className="payment-item-amount"> <i className="fas fa-phone"></i> :  {request.phone}</small>
                                <br />
                                <small className="payment-item-amount"><strong>UTR</strong> :  {request.UTR}</small>
                                <br />
                                <small className="payment-item-amount">
                                    <i className="fas fa-calendar"></i> : {formatDate(new Date(request.createdAt._seconds * 1000))}
                                </small>
                                <p>
                                    <strong>Proof</strong> : <a href={request.proofURL} download target="_blank">
                                        Download PDF
                                    </a>
                                </p>

                            </div>
                            <div>
                                {request.status === 'pending' && (
                                    <>
                                        <Button variant="success" className="me-2" onClick={() => handleAccept(request.userId, request.amount, request)}>Accept</Button>
                                        <Button variant="danger" onClick={() => handleReject(request.userId, request.amount, request)}>Reject</Button>
                                    </>
                                )}
                                {request.status === 'accepted' && (
                                    <span className="text-success payment-item-status-success" style={{ fontWeight: 'bold' }}>Accepted</span>
                                )}
                                {request.status === 'rejected' && (
                                    <span className="text-danger payment-item-status-danger" style={{ fontWeight: 'bold' }} >Rejected</span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="payment-modal-title">User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="payment-modal-body">
                    {/* Display user details here */}
                </Modal.Body>
                <Modal.Footer className="payment-modal-footer">
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
