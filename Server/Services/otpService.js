const crypto = require('crypto')

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid, smsAuthToken, {
    lazyLoading: true,
});

class OtpService {

    async generateOtp() {
        const otp = crypto.randomInt(100000, 999999)
        return otp;
    }

    async sendBySms(phone, otp) {
        return await twilio.messages.create({
            to: phone,
            from: process.env.SMS_FROM,
            body: `<#> ${otp} is your OTP for accessing Virtual Meet Account`
        })
    }

    verifyOtp() { }

}

module.exports = new OtpService();