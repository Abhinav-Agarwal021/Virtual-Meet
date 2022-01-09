import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getCsBId, getMs, getUs, sendMssgs } from '../../http/Http'
import { Message } from '../../Shared Components/Messages/Message'
import Picker from 'emoji-picker-react';
import { io } from "socket.io-client"
import Peer from "simple-peer";
import styles from "./Chat.module.css"
import { useHistory } from 'react-router-dom';

import { GoSmiley } from "react-icons/go";
import { BiPhoneCall } from "react-icons/bi";
import { MdKeyboardBackspace } from "react-icons/md";
import Styles from '../one_to_one_video_Chat/VideoChat.module.css'

export const Chat = () => {

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    const [currentChat, setCurrentChat] = useState()
    const [friend, setfriend] = useState(null)
    const [messages, setMessages] = useState([])
    const socket = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef()

    const [newMssg, setNewMssg] = useState("")
    const [emojisOpen, setEmojisOpen] = useState(false)

    const { user } = useSelector((state) => state.user);
    const history = useHistory();

    const onEmojiClick = (event, emojiObject) => {
        event.preventDefault();
        setNewMssg(newMssg + emojiObject.emoji);
    };

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    const [stream, setStream] = useState(null)
    const [me, setMe] = useState('')
    const [call, setCall] = useState({})
    const [callAnswered, setCallAnswered] = useState(false)
    const [callEnded, setCallEnded] = useState(false)

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {
                width: { min: 1024, ideal: 1280, max: 1920 },
                height: { min: 576, ideal: 720, max: 1080 }
            }
        })
            .then((currentStream) => {
                setStream(currentStream);
                console.log(currentStream)
                myVideo.current.srcObject = currentStream;
            })

        socket.current.on('me', (id) => setMe(id));

        socket.current.on('callfriend', ({ from, signal }) => {
            setCall({ isReceivedCall: true, from, signal });
        })
    }, [])

    const answerCall = () => {
        setCallAnswered(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.current.emit('callanswered', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.current.emit('callfriend', { userToCall: id, signalData: data, from: me });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.current.on('callanswered', (signal) => {
            setCallAnswered(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();
    };

    useEffect(() => {
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                senderName: data.senderName,
                message: data.message,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        const chat = currentChat?.members.find((m) => m !== user.id)

        if (chat) {
            const getFrined = async () => {
                const Friend = await getUs(chat);
                setfriend(Friend.data);
            }

            getFrined();
        }
    }, [user, currentChat])

    useEffect(() => {
        socket.current.emit("addUser", user.id);
    }, [user]);

    useEffect(() => {
        const getConversation = async () => {
            try {
                const res = await getCsBId(id)
                setCurrentChat(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        getConversation()
    }, [id])

    useEffect(() => {
        if (currentChat) {
            const getMessages = async () => {
                try {
                    const res = await getMs(currentChat?._id)
                    setMessages(res.data);
                } catch (error) {
                    console.log(error)
                }
            }
            getMessages()
        }
    }, [currentChat])

    const sendMssg = async () => {

        if (!newMssg) return;
        const userCs = {
            sender: user.id,
            senderName: user.name,
            message: newMssg,
            conversationId: currentChat?._id
        }

        const receiverId = currentChat?.members.find(
            (member) => member !== user.id
        );

        socket.current.emit("sendMessage", {
            senderId: user.id,
            senderName: user.name,
            receiverId,
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMssg();
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    const handleBack = () => {
        history.goBack();
    }

    const handleCallUser = () => {
        callUser(friend?.id);
    }

    return (
        <div className={styles.messenger}>
            <div className={styles.chat__Box}>
                <div className={styles.chat__wrapper}>
                    <div className={styles.dm__navbar}>
                        <span className={styles.go__back} onClick={handleBack} >
                            <MdKeyboardBackspace className={styles.go__back__icon} />
                        </span>
                        <div className={styles.friend}>
                            @ {friend?.name}
                        </div>
                        <BiPhoneCall className={styles.phone__call} onClick={handleCallUser} />
                    </div>
                    {/*{
                            (callAnswered && !callEnded) ?
                                <div className={Styles.video__containers}>
                                    <video className={Styles.video} muted ref={userVideo} autoPlay playsInline />
                                     <button onClick={leaveCall}>End call</button>
                                </div>
                                :
                                (call.isReceivedCall && !callAnswered) ?
                                    <div className={Styles.calling}>
                                        <h1>{user.name} is calling....</h1>
                                        <button onClick={answerCall}>accept call</button>
                                    </div>
                                    : */}
                    <div className={Styles.me__calling}>
                        <video className={Styles.video} muted ref={myVideo} autoPlay playsInline />
                    </div>
                    <div className={styles.chatBox__top}>
                        {messages.map((msg) => (
                            <div ref={scrollRef}>
                                <Message mssg={msg} own={msg.sender === user.id} />
                            </div>
                        ))}
                    </div>
                    {emojisOpen &&
                        <div className={styles.emojis}>
                            <Picker onEmojiClick={onEmojiClick} disableAutoFocus disableSkinTonePicker />
                        </div>
                    }
                    <div className={styles.send__chat}>
                        <GoSmiley className={styles.emoji__selection} onClick={() => setEmojisOpen(!emojisOpen)} />
                        <input value={newMssg} onClick={() => setEmojisOpen(false)} className={styles.write__mssg} autoFocus="autoFocus" type="message" placeholder={`Message @${friend?.name}`} onChange={(e) => setNewMssg(e.target.value)} onKeyDown={handleKeyDown} />
                        <img className={styles.send__mssg} src="/images/send-icon.png" alt="" onClick={sendMssg} />
                    </div>
                </div>
            </div>
        </div>
    )
}
