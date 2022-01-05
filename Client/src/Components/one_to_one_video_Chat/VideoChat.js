import React, { useEffect, useState, useRef } from 'react'
import styles from './VideoChat.module.css'
import { io } from "socket.io-client";
import Peer from "simple-peer";

export const VideoChat = () => {

    const socket = useRef();
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    const [stream, setStream] = useState(null)
    const [me, setMe] = useState('')
    const [call, setCall] = useState({})
    const [callAnswered, setCallAnswered] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState('');

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
            })

        socket.on('me', (id) => setMe(id));

        socket.on('callfriend', ({ name: callerName, from, signal }) => {
            setCall({ isReceivedCall: true, name: callerName, from, signal });
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

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callfriend', { userToCall: id, signalData: data, from: me, name });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callanswered', (signal) => {
            setCallAnswered(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
    };

    return (
        callAnswered && !callEnded &&
        <div className={styles.video__containers}>
            <video className={styles.video} muted ref={myVideo} autoPlay playsInline />
            <video className={styles.video} muted ref={null} autoPlay playsInline />
                <button onClick={leaveCall}>End call</button>
        </div>
    )
}
