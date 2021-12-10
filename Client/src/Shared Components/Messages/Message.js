import React, { useState, useEffect } from 'react'
import styles from "./Message.module.css"

import { format } from "timeago.js"
import { getUs } from '../../http/Http'

export const Message = (props) => {

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const getU = async () => {
            try {
                const res = await getUs(props.mssg.sender)
                setUserData(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        getU();
    }, [props])

    return (
        <div className={`${styles.messages} ${props.own && styles.own}`}>
            <div className={styles.message__top}>
                <div className={styles.message__writer}>
                    {userData?.name}
                </div>
                <div className={styles.message__time}>
                    {format(props.mssg.createdAt)}
                </div>
            </div>
            <p className={styles.message__content}>
                {props.mssg.message}
            </p>
        </div>
    )
}
