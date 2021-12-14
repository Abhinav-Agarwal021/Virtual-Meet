import React, { useState } from 'react'
import styles from "./AddRooms.module.css"
import { useSelector } from 'react-redux';
import { TextInput } from '../../Shared Components/TextInput/TextInput'
import { createRoom as create } from '../../http/Http'

export const AddRooms = ({ onClose }) => {

    const { user } = useSelector((state) => state.user);
    const [server, setServer] = useState(`${user.name}'s Server`);

    async function createRoom() {
        try {
            if (!server) return;
            const { data } = await create({ server, ownerId: user.id });
            console.log(data)
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className={styles.modalMask}>
            <div className={styles.modalBody}>
                <button onClick={onClose} className={styles.closeButton}>
                    <img src="/images/close.png" alt="close" />
                </button>
                <div className={styles.modalHeader}>
                    <h3 className={styles.heading}>
                        Server's Name
                    </h3>
                    <TextInput
                        fullwidth="true"
                        value={server}
                        onChange={(e) => setServer(e.target.value)}
                    />
                </div>
                <div className={styles.modalFooter}>
                    <h2>Start a room, open to everyone</h2>
                    <button
                        onClick={createRoom}
                        className={styles.footerButton}
                    >
                        <span>Let's go</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
