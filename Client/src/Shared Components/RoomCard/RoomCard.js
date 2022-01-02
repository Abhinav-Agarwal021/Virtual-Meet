import React, { useState, useEffect } from 'react'
import { getCsBId, getUs } from '../../http/Http'
import styles from "./RoomCard.module.css"
import { useSelector } from 'react-redux'

export const RoomCard = (props) => {

    const { user } = useSelector((state) => state.user)

    const [friend, setFriend] = useState(null)
    const [convData, setConvData] = useState(null)

    useEffect(() => {

        const getConvData = async () => {
            const res = await getCsBId(props.conv?._id);
            setConvData(res.data)
        }

        getConvData();
    }, [props.conv])


    useEffect(() => {
        const friendId = convData?.members?.find((m) => m !== user.id)
        const getFriendUId = async () => {
            if (friendId) {
                const res = await getUs(friendId);
                setFriend(res.data)
            }
        }

        getFriendUId();
    }, [user, convData])

    return (
        <div className={styles.card} onClick={props.onClick}>
            <h3 className={styles.topic}>{props.room ? props.room.server : friend?.name}</h3>
            {/*<div className={styles.speakers}>
                <div className={styles.avatars}>
                    {room.speakers.map((speaker) => (
                        <img src={speaker.avatar} alt="speaker-avatar" />
                    ))}
                </div>
                <div className={styles.names}>
                    {room.speakers.map((speaker, idx) => (
                        <div key={idx} className={styles.nameWrapper}>
                            <span key={idx}>{speaker.name}</span>
                        </div>
                    ))}
                </div>
                    </div>*/}
            <div className={styles.peopleCount}>
                {/*<span>{room.totalPeople}</span>*/}
                <img src="/images/user-icon.png" alt="user-icon" />
            </div>
        </div>
    )
}
