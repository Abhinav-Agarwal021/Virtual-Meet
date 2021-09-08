import React, { useState } from 'react'
import styles from "./Otp.module.css"

import { Card } from "../../../Shared Components/Card/Card"
import { Button } from "../../../Shared Components/Button/Button"
import { TextInput } from '../../../Shared Components/TextInput/TextInput'

export const Otp = (props) => {

    const [otp, setOtp] = useState('');

    return (
        <div className={styles.cardWrapper}>
            <Card
                title="Enter the code we just sent you"
                icon="otp"
            >
                <TextInput
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" />
                </div>
            </Card>
        </div>
    )
}
