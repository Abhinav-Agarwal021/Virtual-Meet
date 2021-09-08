import React from 'react'
import { Link, useHistory } from "react-router-dom"

import { Card } from "../../Shared Components/Card/Card"
import { Button } from "../../Shared Components/Button/Button"

import styles from "./Home.module.css"

export const Home = () => {

    const signInLinkStyle = {
        color: '#0077ff',
        fontWeight: 'bold',
        textDecoration: 'none',
        marginLeft: '10px',
    };

    const history = useHistory();

    function startRegister() {
        history.push('/register');
    }

    return (
        <div className={styles.cardWrapper}>
            <Card title="Welcome to virtual meet">
                <p className={styles.text}>
                    Want to Connect with your Friend or want to attend an official virtual meeting. Go Ahead!!
                </p>
                <div>
                    <Button onClick={startRegister} text="Get your username" />
                </div>
                <div className={styles.signinWrapper}>
                    <span className={styles.hasInvite}>
                        Have an invite text?
                    </span>
                    <Link style={signInLinkStyle} to="/login">
                        Sign in
                    </Link>
                </div>
            </Card>
        </div>
    )
}
