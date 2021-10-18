import React from 'react'
import styles from "./Message.module.css"

export const Message = (props) => {
    return (
        <div className={`${styles.messages} ${props.own && styles.own}`}>
            <div className={styles.message__top}>
                <div className={styles.message__writer}>
                    Abhinav
                </div>
                <div className={styles.message__time}>
                    12:45 AM
                </div>
            </div>
            <p className={styles.message__content}>
                Hellokkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
            </p>
        </div>
    )
}
