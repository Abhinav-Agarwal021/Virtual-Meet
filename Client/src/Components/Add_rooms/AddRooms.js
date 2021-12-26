import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import styles from "./AddRooms.module.css"
import { useSelector } from 'react-redux';
import { TextInput } from '../../Shared Components/TextInput/TextInput'
import { createRoom as create, sendCat, sendChannels, sendRoles } from '../../http/Http'

export const AddRooms = (props) => {

    const history = useHistory();

    const { user } = useSelector((state) => state.user);
    const [server, setServer] = useState(`${props.room ? `${user.name}'s Server` : ""}`);
    const [role, setRole] = useState("public")

    const [selectedOption, setSelectedOption] = useState("Text")

    async function createRoom() {
        try {
            if (!server) return;
            const data = await create({ server, dm: false, members: user.id, roles: ["public", "admin"] });
            const res = await sendCat({ roomId: data.data.id, name: "text channels", role: "public" })
            await sendRoles({ roomId: data.data.id, userId: user.id, role: ["admin", "public"] })
            await sendChannels({ categoryId: res.data.id, name: "general", type: "text", roomId: data.data.id })
            history.push(`/grp/${data.data.id}`)
            props.onClose();
        } catch (err) {
            console.log(err.message);
            props.onClose();
        }
    }

    const createCat = async () => {
        if (!server) return;
        await sendCat({ roomId: props.currentRoom?._id, name: server, role })
        props.onClose();
    }

    const createChannel = () => {

    }

    const onValueChange = (e) => {
        setSelectedOption(e.target.value)
    }

    return (
        <div className={styles.modalMask}>
            <div className={styles.modalBody}>
                <button onClick={props.onClose} className={styles.closeButton}>
                    <img src="/images/close.png" alt="close" />
                </button>
                <div className={styles.modalHeader}>
                    {props.channel &&
                        <>
                            <div className={styles.select__channeltype}>
                                <h3 className={`${styles.heading} ${styles.type}`}>CHANNEL TYPE</h3>
                                <div className={styles.text__channel}>
                                <input
                                    type="radio"
                                    value="Text"
                                    checked={selectedOption === "Text"}
                                    onChange={onValueChange}
                                />
                                Text
                                </div>
                                <div className={styles.voiceChannel}>
                                </div>
                            </div>
                        </>
                    }
                    <h3 className={styles.heading}>
                        {props.field}
                    </h3>
                    <TextInput
                        fullwidth="true"
                        value={server}
                        onChange={(e) => setServer(e.target.value)}
                    />
                    {props.category &&
                        <>
                            <h3 className={styles.heading}>
                                Role
                            </h3>
                            <TextInput
                                fullwidth="true"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </>
                    }
                </div>
                <div className={styles.modalFooter}>
                    {props.room &&
                        <h2>Start a room, the type you want</h2>
                    }
                    <button
                        onClick={props.room ? createRoom : props.category ? createCat : props.channel ? createChannel : null}
                        className={styles.footerButton}
                    >
                        <span>Let's go</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
