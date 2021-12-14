import React, { useEffect, useState } from 'react'
import styles from "./RoomCard.module.css"

export const RoomCard = ({ room, onClick }) => {
    return (
        <div className={styles.card} onClick={onClick}>
            <h3 className={styles.topic}>{room.server}</h3>
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
