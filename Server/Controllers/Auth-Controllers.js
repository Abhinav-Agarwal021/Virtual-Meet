const HashService = require('../Services/HashService');
const otpService = require('../Services/otpService');

class AuthController {
    async sendOtp(req, res) {
        const { phone } = req.body;

        if (!phone) {
            res.status(400).json({ message: "Phone field is required" })
        }

        const Otp = await otpService.generateOtp();

        const timeleap = 1000 * 60 * 5;
        const expiryTime = Date.now() + timeleap;

        const hashData = `${phone}.${Otp}.${expiryTime}`

        const hash = HashService.hashOtp(hashData)

        try {
            await otpService.sendBySms(phone, Otp)
            res.json({
                hash: `${hash}.${expiryTime}`,
                phone,
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Failed to send OTP"
            })
        }
    }
}

module.exports = new AuthController();