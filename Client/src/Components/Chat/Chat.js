import React from 'react'
import { Message } from '../../Shared Components/Messages/Message'
import styles from "./Chat.module.css"

export const Chat = () => {
    return (
        <div className={styles.messenger}>
            <div className={styles.server__menu}>
                <div className={styles.serverName__wrapper}>
                    #Welcome
                </div>
            </div>
            <div className={styles.chat__Box}>
                <div className={styles.chat__wrapper}>
                    <div className={styles.chatBox__top}>
                        <Message />
                        <Message own={true} />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                    </div>
                    <div className={styles.send__chat}>
                        <input className={styles.write__mssg} type="text" placeholder="Message #Welcome" />
                        <img className={styles.send__mssg} src="/Images/send-icon.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
