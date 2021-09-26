import React, { useState } from 'react'
import styles from "../PhoneEmail.module.css"

import { Card } from "../../../../Shared Components/Card/Card"
import { Button } from "../../../../Shared Components/Button/Button"
import { TextInput } from '../../../../Shared Components/TextInput/TextInput'
import { sendOtp } from '../../../http/Http'

export const Phone = (props) => {

    const [phoneNumber, setPhoneNumber] = useState('')

    const send = async () => {
        const res = await sendOtp({ phone: phoneNumber })
        console.log(res)
    }

    return (
        <Card title="Enter you phone number">
            <TextInput
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" onClick={send} />
                </div>
            </div>
        </Card>
    )
}
