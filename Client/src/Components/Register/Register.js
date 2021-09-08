import React, { useState } from 'react'
import Styles from "./Register.module.css"

import { PhoneEmail } from '../Steps/PhoneEmailStep/PhoneEmail';
import { Otp } from '../Steps/OtpStep/Otp';
import { Name } from '../Steps/NameStep/Name';
import { Avatar } from '../Steps/AvatarStep/Avatar';
import { Username } from '../Steps/UsernameStep/Username';

const steps = {
    1: PhoneEmail,
    2: Otp,
    3: Name,
    4: Avatar,
    5: Username,
};

export const Register = () => {

    const [step, setStep] = useState(1);
    const Step = steps[step];

    const onClick = () => {
        setStep(step + 1);
    }

    return (
        <div>
            <Step onClick={onClick} />
        </div>
    )
}
