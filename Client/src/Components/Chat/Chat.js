import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getCs, getMs } from '../../http/Http'
import { Message } from '../../Shared Components/Messages/Message'
import styles from "./Chat.module.css"

export const Chat = () => {

    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState()
    const [messages, setMessages] = useState([])

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const getConversation = async () => {
            try {
                const res = await getCs(user.id)
                setConversations(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        getConversation()
    }, [user.id])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await getMs(currentChat?._id)
                setMessages(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getMessages()
    }, [currentChat])

    console.log(messages)

    return (
        <div className={styles.messenger}>
            <div className={styles.server__menu}>
                <div className={styles.serverName__wrapper}>
                    {conversations.map((c) => (
                        <div onClick={() => setCurrentChat(c)}>
                            <span>#Welcome</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.chat__Box}>
                {currentChat ?
                    <div className={styles.chat__wrapper}>
                        <div className={styles.chatBox__top}>
                            {messages.map((msg) => (
                                <Message mssg={msg} own={msg.sender === user.id} />
                            ))}
                        </div>
                        <div className={styles.send__chat}>
                            <input className={styles.write__mssg} type="text" placeholder="Message #Welcome" />
                            <img className={styles.send__mssg} src="/Images/send-icon.png" alt="" />
                        </div>
                    </div>
                    :
                    null}
            </div>
        </div>
    )
}
