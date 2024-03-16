import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, getSingleUser } from "../../Firebase/config";
import { signOut } from "firebase/auth";

function DashboardScreen() {
    const [userData, setUserData] = useState({});
    const history = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            while (!auth.currentUser) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            console.log(auth.currentUser.uid);
            try {
                const data = await getSingleUser(auth.currentUser.uid);
                setUserData(data);
            } catch (error) {
                console.error('Error getting user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleClick = () => {
        signOut(auth)
            .then(() => {
                history('/');
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    }

    return (
        <div>
            <h1>DashboardScreen</h1>
            {auth.currentUser && (
                <p>Welcome {userData?.name}</p>
            )}
            <button onClick={handleClick}>Sign Out</button>
        </div>
    );
}

export default DashboardScreen;
