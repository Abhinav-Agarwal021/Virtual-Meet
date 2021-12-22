import React, { useState } from 'react'
import styles from "./AddRooms.module.css"
import { useSelector } from 'react-redux';
import { TextInput } from '../../Shared Components/TextInput/TextInput'
import { createRoom as create, sendCat, sendChannels, sendRoles } from '../../http/Http'

export const AddRooms = ({ onClose }) => {

    const { user } = useSelector((state) => state.user);
    const [server, setServer] = useState(`${user.name}'s Server`);

    async function createRoom() {
        try {
            if (!server) return;
            const data = await create({ server, dm: false, members: user.id, roles: ["public", "admin"] });
            const res = await sendCat({ roomId: data.data.id, name: "text channels", role: "public" })
            await sendRoles({ roomId: data.data.id, userId: user.id, role: ["admin", "public"] })
            await sendChannels({ categoryId: res.data.id, name: "general", type: "text", roomId: data.data.id })
            onClose();
        } catch (err) {
            console.log(err.message);
            onClose();
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
