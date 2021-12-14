import React, { useState, useEffect } from 'react'
import styles from "./Rooms.module.css"
import { RoomCard } from '../../Shared Components/RoomCard/RoomCard';
import { AddRooms } from '../Add_rooms/AddRooms';
import { getRs, getUsBD } from '../../http/Http';
import { useSelector } from 'react-redux';
import { createRoom as create } from '../../http/Http'

import { useHistory } from 'react-router-dom';

export const Rooms = () => {

    const history = useHistory();

    const { user } = useSelector((state) => state.user);

    const [showModal, setShowModal] = useState(false)
    const [searchno, setSearchno] = useState('')
    const [room, setRoom] = useState([])

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
                const { data } = await create({ server: friend.data.name, ownerId: user.id, participant: friend.data._id });
                const rooms = await getRs(data.ownerId)
                setRoom([...room, rooms.data])
            } catch (error) {
                console.log(error)
            }
        }
        else {
            console.log("please enter another number")
        }
    }

    const handleOpenChat = (id) => {
        history.push(`/chat/${id}`)
    }

    useEffect(() => {

        const fetchRooms = async () => {
            const rooms = await getRs(user.id)
            setRoom(rooms.data)
        }
        fetchRooms();

    }, [user])

    return (
        <>
            <div className="container">
                <div className={styles.roomsHeader}>
                    <div className={styles.left}>
                        <span className={styles.heading}>Rooms</span>
                        <div className={styles.searchBox}>
                            <input type="text" value={searchno} className={styles.searchInput} onChange={(e) => setSearchno(e.target.value)} />
                            <img src="/images/search-icon.png" alt="search" onClick={handleSearch} />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <button onClick={openModal} className={styles.startRoomButton}>
                            <img
                                src="/images/add-room-icon.png"
                                alt="add-room"
                            />
                            <span>Start a room</span>
                        </button>
                    </div>
                </div>

                <div className={styles.roomList}>
                    {room.map((room) => (
                        <RoomCard key={room.id} room={room} onClick={() => handleOpenChat(room.id)} />
                    ))}
                </div>
            </div>
            {showModal && <AddRooms onClose={() => setShowModal(false)} />}
        </>
    )
}
