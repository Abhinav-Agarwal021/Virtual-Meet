import React from 'react'
import styles from './UpdateModal.module.css'

export const UpdateModal = (props) => {
    return (
        <div className={styles.modalMask}>
            <div className={styles.modalBody}>
                <button onClick={props.onClose} className={styles.closeButton}>
                    <img src="/images/close.png" alt="close" />
                </button>
                <div className={styles.modalHeader}>
                    <h3 className={styles.heading}>
                        {props.channel ? "Edit Channel" : "Edit Category"}
                    </h3>
                    <input type="text" value={props.channel ? props.currentChannel.name : props.currentCat.name} />
                    {props.cat &&
                        <>
                            <h3 className={styles.heading}>
                                Edit category role
                            </h3>
                            <input type="text" value={props.currentCat.role} />
                        </>
                    }
                </div>
                <div className={styles.modalFooter}>
                    <div className={styles.code}>
                        <button className={`${styles.footerButton} ${styles.delete}`} >{props.channel ? "Delete Channel" : "Delete Category"}</button>
                        <button className={`${styles.footerButton} ${styles.update}`} >{props.channel ? "Update Channel" : "Update Category"}</button>
                    </div>
                    <h2 className={styles.validation}>{props.channel ? "**These updates will delete everything in your channel" : "**These updates will delete everything in your category."}</h2>
                </div>
            </div>
        </div>
    )
}
