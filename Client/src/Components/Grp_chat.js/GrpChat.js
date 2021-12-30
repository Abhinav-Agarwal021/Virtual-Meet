import React, { useState, useEffect, useRef } from 'react'
import { checkCode, deleteRole, getChannels, getMs, getRId, getRoom, leaveServer, sendCode, sendMssgs, UserRoles } from '../../http/Http';
import styles from './GrpChat.module.css'
import { useSelector } from 'react-redux';
import { io } from "socket.io-client"
import { useHistory } from 'react-router-dom';

import { FaChevronDown } from "react-icons/fa";
import { BsPersonPlus } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { RiVoiceprintFill } from "react-icons/ri";
import { BsChatText } from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

import { Message } from '../../Shared Components/Messages/Message';
import { AddRooms } from '../Add_rooms/AddRooms';
import { InviteModal } from '../../Shared Components/InviteModal/InviteModal';
import { UpdateModal } from '../../Shared Components/UpdatesModal/UpdateModal';

export const GrpChat = () => {

    const history = useHistory();

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    const [categories, setCategories] = useState([])
    const [channels, setChannels] = useState([])
    const [openChat, setOpenChat] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [openedChat, setOpenedChat] = useState(null)
    const [catClosed, setCatClosed] = useState([])
    const [room, setRoom] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)

    const [newMssg, setNewMssg] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [messages, setMessages] = useState([])

    const [openServerSet, setOpenServerSet] = useState(false)
    const [showCatModal, setShowCatModal] = useState(false)
    const [showChannelModal, setShowChannelModal] = useState(false)
    const [showInviteModal, setShowInviteModal] = useState(false)
    const [channelUpdates, setChannelUpdates] = useState(false)
    const [catUpdates, setCatUpdates] = useState(false)

    const [currentCat, setCurrentCat] = useState(null)
    const [currentChannel, setCurrentChannel] = useState(null)

    const [code, setCode] = useState(null)
    const [userRoles, setUserRoles] = useState(null)

    const { user } = useSelector((state) => state.user);

    const socket = useRef();
    const scrollRef = useRef()

    const [isHoveringId, setisHoveringId] = useState(null)
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = (idx) => {
        setIsHovering(true);
        setisHoveringId(idx)
    };

    const handleMouseOut = () => {
        setIsHovering(false);
        setisHoveringId(null)
    };

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
        arrivalMessage &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);
    
    useEffect(() => {
        socket.current.emit("addUser", user.id);
    }, [user]);

    const getCat = async () => {
        setShowCatModal(false)
        const room = await getRoom(id);
        setCategories(room.data);
    }

    useEffect(() => {
        const getRoomData = async () => {
            const room = await getRoom(id);
            setCategories(room.data);
        }

        getRoomData();
    }, [id])

    const getChannel = async () => {
        setShowChannelModal(false)
        const channels = await getChannels(id);
        setChannels(channels.data);
    }

    useEffect(() => {
        const getChannelscat = async () => {
            const channels = await getChannels(id);
            setChannels(channels.data);
        }

        getChannelscat();
    }, [id])

    useEffect(() => {
        const getUserRoles = async () => {
            const userRole = await UserRoles({ roomId: id, userId: user.id })
            setUserRoles(userRole.data[0].role)
            if (userRole.data[0].role.includes("admin")) {
                setIsAdmin(true)
            }
        }

        getUserRoles()
    }, [id, user])

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

    const handleServerSet = () => {
        setOpenServerSet(!openServerSet);
    }

    const handleCreateChannel = () => {
        setShowChannelModal(true);
        setOpenServerSet(false)
    }

    const handleCreateCat = () => {
        setShowCatModal(true);
        setOpenServerSet(false)
    }

    const inviteFrnds = async () => {
        const check = await checkCode({ roomId: id });
        if (check.data[0] === undefined) {
            const send = await sendCode({ roomId: id })
            console.log(send)
            setCode(send.data);
        }
        else {
            setCode(check.data[0]);
        }
        setShowInviteModal(true);
        setOpenServerSet(false)
    }

    const handleLeaveServer = async () => {
        const leave = await leaveServer({ roomId: id, userId: user.id })
        console.log(leave)
        setOpenServerSet(false);
        history.push('/rooms')
        await deleteRole({ roomId: id, userId: user.id })
    }

    const handleChannelUpdates = (channel) => {
        setCurrentChannel(channel)
        setChannelUpdates(true);
    }

    const handleCatUpdates = (cat) => {
        setCurrentCat(cat)
        setCatUpdates(true);
    }

    const getCurrentCat = async () => {
        setCatUpdates(false);
        const room = await getRoom(id);
        setCategories(room.data);
        const channels = await getChannels(id);
        setChannels(channels.data);
    }

    const getCurrentChannel = async () => {
        setChannelUpdates(false);
        const channels = await getChannels(id);
        setChannels(channels.data);
    }

    return (
        <>
            <div className={styles.messenger}>
                <div className={styles.server__menu}>
                    <div className={styles.category__navbar} onClick={handleServerSet}>
                        <p>{room?.server}</p>
                        {openServerSet ? <AiOutlineClose className={styles.server_set__close} /> :
                            <FaChevronDown className={styles.server_set__dropdown} />
                        }
                    </div>
                    {openServerSet &&
                        <div className={styles.server__set}>
                            {isAdmin ?
                                <>
                                    <div className={styles.set} onClick={inviteFrnds}>
                                        <p>Invite People</p>
                                        <BsPersonPlus />
                                    </div>
                                    <div className={styles.set}>
                                        <p>Server Settings</p>
                                        <FiSettings />
                                    </div>
                                    <div className={styles.set} onClick={handleCreateChannel}>
                                        <p>Create Channel</p>
                                        <BsPlusCircle />
                                    </div>
                                    <div className={styles.set} onClick={handleCreateCat}>
                                        <p>Create Category</p>
                                        <BsFileEarmarkPlus />
                                    </div>
                                </>
                                :
                                <div className={styles.leave} onClick={handleLeaveServer}>
                                    <p>Leave Server</p>
                                    <FiLogOut />
                                </div>
                            }
                        </div>
                    }
                    {categories.map((cat, idx) =>
                        userRoles?.includes(cat.role) &&
                        <div className={styles.serverName__wrapper}>
                            <div className={styles.category} key={idx}>
                                <div className={styles.category__desc} onClick={() => handleCat(idx)}>
                                    <FaChevronDown className={!catClosed.includes(idx) ? styles.drop__icon : styles.right__icon} />
                                    <p>{cat.name}</p>
                                </div>
                                {isAdmin &&
                                    <>
                                        <AiOutlinePlus onClick={handleCreateChannel} />
                                        <FiSettings className={styles.settings__icon} onClick={() => handleCatUpdates(cat)} />
                                    </>
                                }
                            </div>
                            {!catClosed.includes(idx) &&
                                <div className={styles.channels}>
                                    {channels.map((channel, index) =>
                                        channel.categoryId === cat.id &&
                                        <div key={index} className={`${styles.channelName} ${selectedIndex === index && styles.selected}`} onMouseOver={() => handleMouseOver(index)} onMouseOut={() => handleMouseOut(index)}>
                                            <div className={styles.channel__desc} onClick={() => handleOpenChat(channel, index)}>
                                                {channel.type === 'voice' ? <RiVoiceprintFill className={styles.channel__type} /> : <BsChatText className={styles.channel__type} />}
                                                <p>{channel.name}</p>
                                            </div>
                                            {isAdmin && ((isHovering && isHoveringId === index) || selectedIndex === index) &&
                                                <FiSettings className={styles.settings__icon} onClick={() => handleChannelUpdates(channel)} />
                                            }
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
            {showCatModal && <AddRooms field="Category Name" currentRoom={room} category onClose={getCat} />}
            {showChannelModal && <AddRooms field="Channel Name" currentRoom={room} roomCategories={categories} channel onClose={getChannel} />}
            {showInviteModal && <InviteModal codeData={code} onClose={() => setShowInviteModal(false)} />}
            {channelUpdates && <UpdateModal currentChannel={currentChannel} channel onClose={getCurrentChannel} />}
            {catUpdates && <UpdateModal currentCat={currentCat} cat onClose={getCurrentCat} />}
        </>
    )
}
