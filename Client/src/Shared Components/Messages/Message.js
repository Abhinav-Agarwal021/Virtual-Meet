import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styles from "./Message.module.css"

import {format} from "timeago.js"

export const Message = (props) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
    }, [props])

    return (
        <div className={`${styles.messages} ${props.own && styles.own}`}>
            <div className={styles.message__top}>
                <div className={styles.message__writer}>
                    Abhinav
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
