import React, { useState } from 'react'
import styles from "./Rooms.module.css"
import { RoomCard } from '../../Shared Components/RoomCard/RoomCard';
import { AddRooms } from '../Add_rooms/AddRooms';
import { getRs, getUsBD, sendCList } from '../../http/Http';
import { useSelector } from 'react-redux';
import { createRoom as create } from '../../http/Http'

const rooms = [
    {
        id: 1,
        topic: 'Which framework best for frontend ?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/monkey-avatar.png',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 3,
        topic: 'What’s new in machine learning?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/monkey-avatar.png',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 4,
        topic: 'Why people use stack overflow?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/monkey-avatar.png',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 5,
        topic: 'Artificial inteligence is the future?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/monkey-avatar.png',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/monkey-avatar.png',
            },
        ],
        totalPeople: 40,
    },
];

export const Rooms = () => {

    const { user } = useSelector((state) => state.user);

    const [showModal, setShowModal] = useState(false)
    const [searchno, setSearchno] = useState('')

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
                const res = await sendCList({ senderId: user.id, receiverId: friend.data._id })
                console.log(res)
                const { data } = await create({ server: friend.data.name });
                console.log(data)
                const rooms = await getRs(data.ownerId)
                console.log(rooms)
            } catch (error) {
                console.log(error)
            }
        }
        else {
            console.log("please enter another number")
        }
    }

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
                    {rooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
            </div>
            {showModal && <AddRooms onClose={() => setShowModal(false)} />}
        </>
    )
}
