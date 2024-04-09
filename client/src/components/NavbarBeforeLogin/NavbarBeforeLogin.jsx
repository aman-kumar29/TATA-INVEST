import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './navbarbeforeLogin.css';
import { Link } from 'react-router-dom';

export default function NavbarBeforeLogin() {
    const history = useNavigate();
    const handleInvestNow = () => {
        history('/signup');
    };
    return (
        <div className='nav-background'>
        <Link to='/'>
        <img src="https://firebasestorage.googleapis.com/v0/b/tatainvest-71bd6.appspot.com/o/logo.png?alt=media&token=47531390-01cb-40a6-9ab0-bca7f18cfec0" alt="TataInvest" height="50" width="70" />
        </Link>            <Button
                onClick={handleInvestNow}
                > Invest Now
            </Button>
        </div>
    )
}
