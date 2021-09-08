import React, { useState } from 'react'
import styles from "./PhoneEmail.module.css"

import { Phone } from './Phone/Phone';
import { Email } from './Email/Email';

const phoneEmailMap = {
    phone: Phone,
    email: Email,
};

export const PhoneEmail = (props) => {

    const [type, setType] = useState('phone');
    const Component = phoneEmailMap[type];

    return (
        <div className={styles.cardWrapper}>
            <div>
                <div className={styles.buttonWrap}>
                    <button
                        className={`${styles.tabButton} ${type === 'phone' ? styles.active : ''
                            }`}
                        onClick={() => setType('phone')}
                    >
                        <img src="/images/phone.png" alt="phone" />
                    </button>
                    <button
                        className={`${styles.tabButton} ${type === 'email' ? styles.active : ''
                            }`}
                        onClick={() => setType('email')}
                    >
                        <img src="/images/email.png" alt="email" />
                    </button>
                </div>
                <Component onClick={props.onClick} />
            </div>
        </div>
    )
}
