import React, { useState, useEffect } from 'react';
import { getRId, getRoom, updateCat, updateServerName } from '../../http/Http';
import { AddRooms } from '../Add_rooms/AddRooms';
import styles from './GrpSettings.module.css'

export const GrpSettings = () => {

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    const [selected, setSelected] = useState(1);
    const [serverName, setServerName] = useState(null);
    const [categories, setCategories] = useState([])
    const [room, setRoom] = useState(null);
    const [showRoleModal, setShowRoleModal] = useState(false)

    const settings = [
        "overview",
        "roles",
        "members",
        "invites"
    ]

    const [isHoveringId, setisHoveringId] = useState(null)
    const handleMouseOver = (index) => {
        setisHoveringId(index)
    };

    const handleMouseOut = () => {
        setisHoveringId(null)
    };

    const onSelectOverview = (index) => {
        setSelected(index)
    }

    useEffect(() => {

        const getRoomsData = async () => {
            const res = await getRId(id);
            setServerName(res.data.server);
        }

        getRoomsData();
    }, [id])

    const handleupdateserver = () => {
        const updatename = async () => {
            const res = await updateServerName({ serverName, id });
            console.log(res.data);
        }
        updatename();
    }

    useEffect(() => {
        const getRoomData = async () => {
            const room = await getRoom(id);
            setRoom(room);
            setCategories(room.data);
        }

        getRoomData();
    }, [id])

    const handleDeleteRole = async (cat) => {
        await updateCat({ catId: cat.id, name: cat.name, role: "public" })
        const room = await getRoom(id);
        setCategories(room.data);
    }

    const getRoles = async () => {
        setShowRoleModal(false);
        const room = await getRoom(id);
        setCategories(room.data);
    }

    const handleCreateRole = () => {
        setShowRoleModal(true);
    }

    return (
        <div className={styles.server__Settings}>
            <div className={styles.server__menu}>
                <div className={styles.servermenu__wrapper}>
                    {settings.map((set, idx) => (
                        <div key={idx} className={`${styles.overview} ${(isHoveringId === idx || selected === idx) && styles.hovered}`} onMouseOver={() => handleMouseOver(idx)} onMouseOut={() => handleMouseOut(idx)} onClick={() => onSelectOverview(idx)}>
                            {set}
                        </div>
                    ))}
                    <p className={styles.border}></p>
                    <div className={`${styles.overview} ${(isHoveringId === 4) && styles.delhovered} ${styles.del__server}`} onMouseOver={() => handleMouseOver(4)} onMouseOut={() => handleMouseOut(4)}>
                        delete server
                    </div>
                </div>
            </div>
            {selected === 0 &&
                <div className={styles.content}>
                    <div className={styles.set__content}>
                        <div className={styles.set__header}>
                            <p className={styles.sett__name}>Server Overview</p>
                        </div>
                        <div className={styles.set__1}>
                            <p>SERVER NAME</p>
                            <input type="text" value={serverName} onChange={(e) => setServerName(e.target.value)} />
                        </div>
                        <div className={styles.set__footer}>
                            <button onClick={handleupdateserver}>Apply</button>
                        </div>
                    </div>
                </div>
            }
            {selected === 1 &&
                <div className={styles.content}>
                    <div className={styles.set__content}>
                        <div className={styles.set__header}>
                            <p className={styles.sett__name}>Roles</p>
                            <p className={styles.set__desc}>use roles to organize your server members and customize their permissions.</p>
                        </div>
                        <div className={styles.create__btn}>
                            <button onClick={handleCreateRole}>Create Role</button>
                        </div>
                        <div className={styles.set__header}>
                            <p className={styles.set__desc}># Deleting a role will make that category public and open to everyone</p>
                        </div>

                        <div className={styles.set__display}>
                            <p className={styles.role}>ROLES</p>
                            <p className={styles.mem}>MEMBERS</p>
                            <p className={styles.cat}>CATAGORY</p>
                            <p className={styles.btn}></p>
                        </div>
                        {categories.map((catdet, idx) => (
                            <div key={idx} className={styles.role__data}>
                                <p className={styles.role}>{catdet.role}</p>
                                <p className={styles.mem}>0</p>
                                <p className={styles.cat}>{catdet.name}</p>
                                <p className={`${styles.btn} ${styles.del__role}`} onClick={() => handleDeleteRole(catdet)}>Delete Role</p>
                            </div>
                        ))}
                    </div>
                </div>
            }
            {showRoleModal && <AddRooms currentRoom={room} roomCategories={categories.filter((cat) => cat.role === "public")} role onClose={getRoles} />}
        </div>
    );
};
