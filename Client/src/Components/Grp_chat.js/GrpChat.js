import React, { useState, useEffect, useRef } from 'react'
import { getChannels, getMs, getRId, getRoom, sendMssgs } from '../../http/Http';
import styles from './GrpChat.module.css'
import { useSelector } from 'react-redux';
import { io } from "socket.io-client"

import { FaChevronDown } from "react-icons/fa";
import { BsPersonPlus } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { RiVoiceprintFill } from "react-icons/ri";
import { BsChatText } from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { Message } from '../../Shared Components/Messages/Message';

export const GrpChat = () => {

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    const [categories, setCategories] = useState([])
    const [channels, setChannels] = useState([])
    const [openChat, setOpenChat] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [openedChat, setOpenedChat] = useState(null)
    const [catClosed, setCatClosed] = useState([])
    const [room, setRoom] = useState(null)

    const [newMssg, setNewMssg] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [messages, setMessages] = useState([])

    const { user } = useSelector((state) => state.user);

    const socket = useRef();
    const scrollRef = useRef()

    useEffect(() => {
        arrivalMessage &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                message: data.message,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        socket.current.emit("addUser", user.id);
    }, [user]);

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

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await getMs(openedChat?.id)
                setMessages(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getMessages()
    }, [openedChat])

    const handleCat = (idx) => {
        if (catClosed.includes(idx)) {
            var newOpen = [...catClosed].filter((e) => e !== idx);
        } else {
            newOpen = [...catClosed, idx];
        }

        setCatClosed(newOpen);
    }

    const handleOpenChat = (channel, idx) => {
        setSelectedIndex(idx);
        if (channel.type === 'text') {
            setOpenChat(true);
            setOpenedChat(channel);
        }
        else {
            setOpenChat(false)
        }
    }

    const sendMssg = async (e) => {
        e.preventDefault();

        if (!newMssg) return;
        const userCs = {
            sender: user.id,
            message: newMssg,
            conversationId: openedChat?.id
        }

        socket.current.emit("sendMessage", {
            senderId: user.id,
            receiverId: "",
            message: newMssg,
        });

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

    useEffect(() => {

        const getRoomsData = async () => {
            const res = await getRId(id);
            setRoom(res.data);
        }

        getRoomsData();
    }, [id])

    return (
        <div className={styles.messenger}>
            <div className={styles.server__menu}>
                <div className={styles.category__navbar}>
                    <p>{room?.server}</p>
                    <FaChevronDown className={styles.server_set__dropdown} />
                </div>
                <div className={styles.server__set}>
                    <div className={styles.set}>
                        <p>Invite People</p>
                        <BsPersonPlus />
                    </div>
                    <div className={styles.set}>
                        <p>Server Settings</p>
                        <FiSettings />
                    </div>
                    <div className={styles.set}>
                        <p>Create Channel</p>
                        <BsPlusCircle />
                    </div>
                    <div className={styles.set}>
                        <p>Create Category</p>
                        <BsFileEarmarkPlus />
                    </div>
                </div>
                {categories.map((cat, idx) =>
                    <div className={styles.serverName__wrapper}>
                        <div className={styles.category} key={idx} onClick={() => handleCat(idx)}>
                            <FaChevronDown className={!catClosed.includes(idx) ? styles.drop__icon : styles.right__icon} />
                            {cat.name}
                        </div>
                        {!catClosed.includes(idx) &&
                            <div className={styles.channels}>
                                {channels.map((channel, index) =>
                                    channel.categoryId === cat.id &&
                                    <div key={index} className={`${styles.channelName} ${selectedIndex === index && styles.selected}`} onClick={() => handleOpenChat(channel, index)}>
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
                {openChat && openedChat ?
                    <div className={styles.chat__wrapper}>
                        <div className={styles.chatBox__top}>
                            {messages.map((msg) => (
                                <div ref={scrollRef}>
                                    <Message mssg={msg} own={msg.sender === user.id} />
                                </div>
                            ))}
                        </div>
                        <div className={styles.send__chat}>
                            <input value={newMssg} className={styles.write__mssg} type="message" placeholder={`Message #${openedChat.name}`} onChange={(e) => setNewMssg(e.target.value)} />
                            <img className={styles.send__mssg} src="/Images/send-icon.png" alt="" onClick={sendMssg} />
                        </div>
                    </div>
                    :
                    <div className={styles.default}>
                        Select any channel to start a conversation with
                    </div>
                }
            </div>
        </div>
    )
}
