import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getCs, getMs, getUs, sendMssgs } from '../../http/Http'
import { Message } from '../../Shared Components/Messages/Message'
import styles from "./Chat.module.css"

export const Chat = () => {

    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState()
    const [messages, setMessages] = useState([])
    const scrollRef = useRef()

    const [newMssg, setNewMssg] = useState("")

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

    const sendMssg = async (e) => {
        e.preventDefault();
        const userCs = {
            sender: user.id,
            message: newMssg,
            conversationId: currentChat?._id
        }

        try {
            const res = await sendMssgs(userCs);
            setNewMssg("")
            setMessages([...messages, res.data])
        } catch (error) {
            console.log("message not sent")
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

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
                                <div ref={scrollRef}>
                                    <Message mssg={msg} own={msg.sender === user.id} />
                                </div>
                            ))}
                        </div>
                        <div className={styles.send__chat}>
                            <input value={newMssg} className={styles.write__mssg} type="text" placeholder="Message #Welcome" onChange={(e) => setNewMssg(e.target.value)} />
                            <img className={styles.send__mssg} src="/Images/send-icon.png" alt="" onClick={sendMssg} />
                        </div>
                    </div>
                    :
                    null}
            </div>
        </div>
    )
}
