import React, { useState } from 'react'
import Styles from "./Login.module.css"

import { PhoneEmail } from '../Steps/PhoneEmailStep/PhoneEmail';
import { Otp } from '../Steps/OtpStep/Otp';

const steps = {
    1: PhoneEmail,
    2: Otp,
};

export const Login = () => {

    const [step, setStep] = useState(1);
    const Step = steps[step];

    const onClick = () => {
        setStep(step + 1);
    }

    return (
        <Step onClick={onClick} />
    )
}
