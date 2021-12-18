import React, { useState } from 'react'
import styles from "./AddRooms.module.css"
import { useSelector } from 'react-redux';
import { TextInput } from '../../Shared Components/TextInput/TextInput'
import { createRoom as create, sendCat } from '../../http/Http'
import {Loader} from '../../Shared Components/Loader/Loader'

export const AddRooms = ({ onClose }) => {

    const { user } = useSelector((state) => state.user);
    const [server, setServer] = useState(`${user.name}'s Server`);
    const [loading, setLoading] = useState(false)

    async function createRoom() {
        setLoading(true);
        try {
            if (!server) return;
            const data = await create({ server, dm: false, members: user.id, admin: user.id });
            console.log(data)
            //const res=await sendCat({data._id,})
            onClose();
        } catch (err) {
            console.log(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    if (loading) return <Loader message="Loading! please wait....." />
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
