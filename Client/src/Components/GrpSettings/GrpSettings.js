import React, { useState, useEffect } from 'react';
import { getRId, updateServerName } from '../../http/Http';
import styles from './GrpSettings.module.css'

export const GrpSettings = () => {

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    const [selected, setSelected] = useState(0);
    const [serverName, setServerName] = useState(null);

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
        </div>
    );
};
