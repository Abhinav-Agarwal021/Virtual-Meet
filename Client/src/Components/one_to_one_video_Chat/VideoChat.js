import React, { useEffect, useState, useRef } from 'react'
import styles from './VideoChat.module.css'
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";
import Peer from "simple-peer";

export const VideoChat = (props) => {

    const socket = useRef();
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    const [stream, setStream] = useState(null)
    const [me, setMe] = useState('')
    const [call, setCall] = useState({})
    const [callAnswered, setCallAnswered] = useState(false)
    const [callEnded, setCallEnded] = useState(false)

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
            })

        socket.on('me', (id) => setMe(id));

        socket.on('callfriend', ({ from, signal }) => {
            setCall({ isReceivedCall: true, from, signal });
        })
    }, [])

    const answerCall = () => {
        setCallAnswered(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callanswered', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();
    };

    return (
        (callAnswered && !callEnded) ?
            <div className={styles.video__containers}>
                <video className={styles.video} muted ref={myVideo} autoPlay playsInline />
                <video className={styles.video} muted ref={null} autoPlay playsInline />
                <button onClick={leaveCall}>End call</button>
            </div>
            :
            (call.isReceivedCall && !callAnswered) ?
                <div className={styles.calling}>
                    <h1>{user.name} is calling....</h1>
                    <button onClick={answerCall}>accept call</button>
                </div>
                :
                stream &&
                <div className={styles.me__calling}>
                    <h1>wait while the call is connected....</h1>
                    <button>cancel</button>
                </div>
    )
}
