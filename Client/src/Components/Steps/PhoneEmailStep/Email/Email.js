import React, { useState } from 'react'
import styles from "../PhoneEmail.module.css"

import { Card } from "../../../../Shared Components/Card/Card"
import { Button } from "../../../../Shared Components/Button/Button"
import { TextInput } from '../../../../Shared Components/TextInput/TextInput'

export const Email = (props) => {

    const [email, setEmail] = useState('');

    return (
        <Card title="Enter your email id" icon="email-emoji">
            <TextInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" onClick={props.onClick} />
                </div>
            </div>
        </Card>
    )
}
