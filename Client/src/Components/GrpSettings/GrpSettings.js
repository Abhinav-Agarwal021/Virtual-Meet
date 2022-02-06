import React, { useState, useEffect } from 'react';
import { expireCode, getCode, getRId, getRoom, getUs, getUserByRole, updateCat, updateServerName } from '../../http/Http';
import { AddRooms } from '../Add_rooms/AddRooms';
import styles from './GrpSettings.module.css'

export const GrpSettings = () => {

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    const [selected, setSelected] = useState(0);
    const [serverName, setServerName] = useState("");
    const [categories, setCategories] = useState([])
    const [room, setRoom] = useState(null);
    const [showRoleModal, setShowRoleModal] = useState(false)
    const [inviteCode, setInviteCode] = useState(null);
    const [selectedRole, setSelectedRole] = useState("public")
    const [selectedRoleId, setSelectedRoleId] = useState(0);
    const [usersOfRole, setUsersOfRole] = useState([]);

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
            setRoom(res.data);
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

    useEffect(() => {
        const getCodes = async () => {
            const check = await getCode({ roomId: id });
            if (check.data[0] !== undefined) {
                setInviteCode(check.data);
            }
        }
        getCodes();
    }, [id])

    const expireInviteCode = async (invite) => {
        console.log("pressed");
        await expireCode({ code: invite.code })
        const check = await getCode({ roomId: id });
        if (check.data[0] !== undefined) {
            setInviteCode(check.data);
        }
    }

    const handleCat = async (e) => {
        setSelectedRole(e.target.value)
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option = el.getAttribute('id');
        setSelectedRoleId(option);
    }

    // useEffect(() => {
    //     const getAllUsersByRole = async () => {
    //         const users = await getUserByRole({ roomId: id, role: room?.roles[selectedRoleId] });
    //         for (let i = 0; i < users.data.length; i++) {
    //             const user = await getUs(users.data[i].userId);
    //             // setUsersOfRole(user.data);
    //         }
    //     }
    //     getAllUsersByRole();
    // }, [id, room, selectedRoleId, usersOfRole])

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
                            <p className={styles.cat}>CATEGORY</p>
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
            {selected === 3 &&
                <div className={styles.content}>
                    <div className={styles.set__content}>
                        <div className={styles.set__header}>
                            <p className={styles.sett__name}>Invites</p>
                            <p className={styles.set__desc}>{inviteCode !== null ? "Here's a list of all invite links." : "No invites yet"}</p>
                        </div>

                        {inviteCode !== null ?
                            <>
                                <div className={styles.set__display}>
                                    <p className={styles.role}>INVITE CODE</p>
                                    <p className={styles.mem}>USES</p>
                                    <p className={styles.cat}>EXPIRED</p>
                                    <p className={styles.btn}></p>
                                </div>
                                {inviteCode.map((inv, idx) => (
                                    <div key={idx} className={styles.role__data}>
                                        <p className={styles.role}>{inv.code}</p>
                                        <p className={styles.mem}>{inv.used}</p>
                                        <p className={`${styles.cat} ${inv.expired ? styles.del__server : styles.green}`}>{inv.expired ? "expired" : "not expired"}</p>
                                        {!inv.expired ?
                                            <p className={`${styles.btn} ${styles.del__role}`} onClick={() => expireInviteCode(inv)}>Delete Invite</p>
                                            :
                                            <p className={`${styles.btn}`}></p>
                                        }
                                    </div>
                                ))}
                            </>
                            :
                            null
                        }
                    </div>
                </div>
            }
            {selected === 2 &&
                <div className={styles.content}>
                    <div className={styles.set__content}>
                        <div className={styles.set__header}>
                            <p className={styles.sett__name}>Server Members</p>
                        </div>
                        <div className={styles.mem__display}>
                            <p className={styles.display__role}>Display role:</p>
                            <select className={styles.role__optionsselect} defaultValue={selectedRole}
                                onChange={handleCat} >
                                {room.roles.map((rol, idx) =>
                                    <option key={idx} className={styles.role__options} value={rol} id={idx}>{rol}</option>
                                )}
                            </select>
                        </div>
                        {usersOfRole.map((inv, idx) => (
                            <div key={idx} className={styles.role__data}>
                                <p className={styles.role}>{inv.code}</p>
                                <p className={styles.mem}>{inv.used}</p>
                                <p className={`${styles.cat} ${inv.expired ? styles.del__server : styles.green}`}>{inv.expired ? "expired" : "not expired"}</p>
                                {!inv.expired ?
                                    <p className={`${styles.btn} ${styles.del__role}`} onClick={() => expireInviteCode(inv)}>Delete Invite</p>
                                    :
                                    <p className={`${styles.btn}`}></p>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            }
            {showRoleModal && <AddRooms currentRoom={room} roomCategories={categories.filter((cat) => cat.role === "public")} role onClose={getRoles} />}
        </div>
    );
};
