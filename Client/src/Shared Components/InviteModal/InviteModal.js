import React, { useState } from 'react'
import { checkCList, getUsBD, sendCList } from '../../http/Http'
import styles from './InviteModal.module.css'
import { useHistory } from 'react-router-dom'

import { useSelector } from 'react-redux'

export const InviteModal = (props) => {

    const history = useHistory();

    const [searchno, setSearchno] = useState('')
    const [clicked, setClicked] = useState(false)

    const { user } = useSelector((state) => state.user);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchno) return;

        /*if (searchno !== user.phone) {
            const friend = await getUsBD(searchno);
            const check = await checkCList({ senderId: user.id, receiverId: friend.data._id });
            console.log(check)
            setSearchno('')
            if (!check.data) {
                try {
                    const conv = await sendCList({ senderId: user.id, receiverId: friend.data._id });
                    history.push(`/chat/${conv.data.id}`)
                } catch (error) {
                    console.log(error)
                }
            }
            else {
                history.push(`/chat/${check.data[0]._id}`)
            }
        }
        else {
            console.log("please enter another number")
        }*/
    }

    const copyLink = () => {
        setClicked(true)
        navigator.clipboard.writeText(props.codeData.code)
        setTimeout(() => {
            setClicked(false)
        }, 1000);
    }

    return (
        <div className={styles.modalMask}>
            <div className={styles.modalBody}>
                <button onClick={props.onClose} className={styles.closeButton}>
                    <img src="/images/close.png" alt="close" />
                </button>
                <div className={styles.modalHeader}>
                    <h3 className={styles.heading}>
                        Invite friends to this server
                    </h3>
                    <div className={styles.searchBox}>
                        <input type="text" value={searchno} placeholder='search for friend' className={styles.searchInput} onChange={(e) => setSearchno(e.target.value)} />
                        <img src="/images/search-icon.png" alt="search" onClick={handleSearch} />
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <h2 className={styles.copyoption}>or, send a server invite link to a friend</h2>
                    <div className={styles.code}>
                        <input type="text" value={props.codeData.code} readOnly />
                        <button className={`${styles.footerButton} ${clicked && styles.copied}`} onClick={copyLink}>{clicked ? "copied" : "copy"}</button>
                    </div>
                    <h2 className={styles.validation}>Your invite code expires in 7days.</h2>
                </div>
            </div>
        </div>
    )
}
