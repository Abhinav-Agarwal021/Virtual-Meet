import React, { useState } from 'react'
import styles from "../PhoneEmail.module.css"

import { Card } from "../../../../Shared Components/Card/Card"
import { Button } from "../../../../Shared Components/Button/Button"
import { TextInput } from '../../../../Shared Components/TextInput/TextInput'
import { sendOtp } from '../../../../http/Http'
import { useDispatch } from "react-redux"
import { SendOtp } from '../../../../Store/AuthSlice'

export const Phone = (props) => {

    const [phoneNumber, setPhoneNumber] = useState('')
    const dispatch = useDispatch();

    const send = async () => {
        const { data } = await sendOtp({ phone: phoneNumber })
        dispatch(SendOtp({ phone: data.phone, hash: data.hash }))
        props.onClick()
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
