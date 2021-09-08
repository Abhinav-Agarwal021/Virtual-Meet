import React, { useState } from 'react'
import styles from "../PhoneEmail.module.css"

import { Card } from "../../../../Shared Components/Card/Card"
import { Button } from "../../../../Shared Components/Button/Button"
import { TextInput } from '../../../../Shared Components/TextInput/TextInput'

export const Phone = () => {

    const [phoneNumber, setPhoneNumber] = useState('')

    return (
        <Card title="Enter you phone number">
            <TextInput
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" />
                </div>
            </div>
        </Card>
    )
}
