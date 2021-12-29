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
                        {props.channel?"Edit Channel":"Edit Category"}
                    </h3>
                    <div className={styles.code}>
                        <input type="text" value="" readOnly />
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <div className={styles.code}>
                        <button className={styles.footerButton} >{props.channel ? "Delete Channel" : "Delete Category"}</button>
                        <button className={styles.footerButton} >{props.channel ? "Update Channel" : "Update Category"}</button>
                    </div>
                    <h2 className={styles.validation}>{props.channel ? "**These updates will delete everything in your channel" : "**These updates will delete everything in your category."}</h2>
                </div>
            </div>
        </div>
    )
}
