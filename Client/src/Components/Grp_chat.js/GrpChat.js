import React, { useState, useEffect } from 'react'
import { getChannels, getRoom } from '../../http/Http';
import styles from './GrpChat.module.css'

import { FaChevronDown } from "react-icons/fa";
import { RiVoiceprintFill } from "react-icons/ri";
import { BsChatText } from "react-icons/bs";

export const GrpChat = () => {

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    const [categories, setCategories] = useState([])
    const [channels, setChannels] = useState([])

    const [catOpen, setCatOpen] = useState({})

    useEffect(() => {
        const getRoomData = async () => {
            const room = await getRoom(id);
            setCategories(room.data);
        }

        getRoomData();
    }, [id])

    useEffect(() => {
        const getChannelscat = async () => {
            const channels = await getChannels(id);
            setChannels(channels.data);
        }

        getChannelscat();
    }, [id])

    const handleCat = (idx) => {
        const currentState = Object.assign({}, catOpen);
        setCatOpen({ ...currentState, [idx]: !catOpen[idx] });
    }

    return (
        <div className={styles.messenger}>
            <div className={styles.server__menu}>
                {categories.map((cat, idx) =>
                    <div className={styles.serverName__wrapper}>
                        <div className={styles.category} key={idx} onClick={() => handleCat(idx)}>
                            <FaChevronDown className={catOpen[idx] ? styles.drop__icon : styles.right__icon} />
                            {cat.name}
                        </div>
                        {catOpen[idx] &&
                            <div className={styles.channels}>
                                {channels.map((channel, idx) =>
                                    channel.categoryId === cat.id &&
                                    <div key={idx} className={styles.channelName}>
                                        {channel.type === 'voice' ? <RiVoiceprintFill className={styles.channel__type} /> : <BsChatText className={styles.channel__type} />}
                                        {channel.name}
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                )}
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
