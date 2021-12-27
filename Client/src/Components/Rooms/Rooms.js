import React, { useState, useEffect } from 'react'
import styles from "./Rooms.module.css"
import { RoomCard } from '../../Shared Components/RoomCard/RoomCard';
import { AddRooms } from '../Add_rooms/AddRooms';
import { getCs, getRId, getRs, getUsBD, sendCList } from '../../http/Http';
import { Loader } from "../../Shared Components/Loader/Loader"
import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

export const Rooms = (props) => {

    const history = useHistory();

    const { user } = useSelector((state) => state.user);

    const [showModal, setShowModal] = useState(false)
    const [searchno, setSearchno] = useState('')
    const [room, setRoom] = useState([])
    const [conversation, setConversation] = useState([])
    const [loading, setLoading] = useState(false)

    const openModal = () => {
        setShowModal(true);
    }

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchno) return;

        if (searchno !== user.phone) {
            try {
                const friend = await getUsBD(searchno);
                setSearchno('')
                const conv = await sendCList({ senderId: user.id, receiverId: friend.data._id });
                history.push(`/chat/${conv.data.id}`)
            } catch (error) {
                console.log(error)
            }
        }
        else {
            console.log("please enter another number")
        }
    }

    const handleOpenChat = (id) => {
        setLoading(true);
        try {
            history.push(`/chat/${id}`)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleOpenRoom = async (id) => {
        setLoading(true);
        try {
            const res = await getRId(id);
            if (res.data.dm) {
                history.push(`/dms`)
            }
            else {
                history.push(`/grp/${id}`)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const fetchRooms = async () => {
            if (!props.dm) {
                setLoading(true);
                try {
                    const rooms = await getRs(user.id)
                    setRoom(rooms.data)
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoading(false)
                }
            }
        }
        fetchRooms();

    }, [user, props])

    useEffect(() => {

        const fetchConversations = async () => {
            if (props.dm) {
                setLoading(true);
                try {
                    const conversations = await getCs(user.id)
                    setConversation(conversations.data)
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoading(false)
                }
            }
        }
        fetchConversations();

    }, [user, props])

    if (loading) return <Loader message="Loading! please wait....." />
    return (
        <>
            <div className="container">
                <div className={styles.roomsHeader}>
                    <div className={styles.left}>
                        <span className={styles.heading}>
                            {props.dm ? "Direct Messages" : "Rooms"}
                        </span>
                        {!props.dm &&
                            <div className={styles.searchBox}>
                                <input type="text" value={searchno} placeholder='Find or start a conversation' className={styles.searchInput} onChange={(e) => setSearchno(e.target.value)} />
                                <img src="/images/search-icon.png" alt="search" onClick={handleSearch} />
                            </div>
                        }
                    </div>
                    {!props.dm &&
                        <div className={styles.right}>
                            <button onClick={openModal} className={styles.startRoomButton}>
                                <img
                                    src="/images/add-room-icon.png"
                                    alt="add-room"
                                />
                                <span>Add a server</span>
                            </button>
                        </div>
                    }
                </div>

                <div className={styles.roomList}>
                    {!props.dm && room.map((room) => (
                        <RoomCard key={room.id} room={room} onClick={() => handleOpenRoom(room.id)} />
                    ))}
                    {props.dm && conversation.map((conv) => (
                        <RoomCard key={conv.id} conv={conv} onClick={() => handleOpenChat(conv._id)} />
                    ))}
                </div>
            </div>
            {showModal && <AddRooms field="Add a server" options onClose={() => setShowModal(false)} />}
        </>
    )
}
