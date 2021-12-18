import React from 'react'
import styles from './GrpChat.module.css'

export const GrpChat = () => {
    return (
        <div className={styles.messenger}>
            <div className={styles.server__menu}>
                <div className={styles.serverName__wrapper}>
                    <div >
                        <span>#Welcome</span>
                    </div>
                </div>
            </div>
            <div className={styles.chat__Box}>
                <div className={styles.chat__wrapper}>
                    <div className={styles.chatBox__top}>
                    </div>
                    <div className={styles.send__chat}>
                        <input className={styles.write__mssg} type="message" placeholder="Message #Welcome" />
                        <img className={styles.send__mssg} src="/Images/send-icon.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
