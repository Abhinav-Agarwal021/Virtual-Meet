import React, { useState, useEffect } from 'react'
import { getRId, getUs } from '../../http/Http'
import styles from "./RoomCard.module.css"
import { useSelector } from 'react-redux'

export const RoomCard = ({ room, onClick }) => {

    const { user } = useSelector((state) => state.user)

    const [friend, setFriend] = useState(null)
    const [roomData, setRoomData] = useState(null)

    useEffect(() => {

        const getRoomData = async () => {
            const res = await getRId(room.id);
            setRoomData(res.data)
        }

        getRoomData();
    }, [room])

    const friendId = roomData?.members.find((m) => m !== user.id)
    
    useEffect(() => {
        const getFriendUId = async () => {
            const res = await getUs(friendId);
            setFriend(res.data)
        }

        getFriendUId();
    }, [friendId])

    return (
        <div className={styles.card} onClick={onClick}>
            <h3 className={styles.topic}>{room.server?room.server:friend?.name}</h3>
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
