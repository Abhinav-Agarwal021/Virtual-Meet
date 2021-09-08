import React from 'react'
import styles from './Navbar.module.css'
import { Link } from "react-router-dom"

export const Navbar = () => {
    const brandStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={brandStyle} to="/">
                <span className={styles.logoText}>Virtual Meet</span>
            </Link>
        </nav>
    )
}
