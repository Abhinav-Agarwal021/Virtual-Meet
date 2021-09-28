const HashService = require('../Services/HashService');
const otpService = require('../Services/otpService');
const TokenService = require('../Services/TokenService');
const UserService = require('../Services/UserService');
const userDto = require("../dtos/userDto")

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
            //await otpService.sendBySms(phone, Otp)
            res.json({
                hash: `${hash}.${expiryTime}`,
                phone,
                Otp,
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Failed to send OTP"
            })
        }
    }

    async verifyOtp(req, res) {
        const { phone, otp, hash } = req.body;

        if (!phone || !otp || !hash) {
            res.status(400).json({ message: "Fields cannot be empty" })
        }

        const [hashOtp, exptime] = hash.split('.')

        if (Date.now() > +exptime) {
            res.status(400).json({
                message: "OTP expired!"
            })
        }

        const verifyData = `${phone}.${otp}.${exptime}`

        const isValid = otpService.verifyOtp(verifyData, hashOtp)

        if (!isValid) {
            res.status(400).json({
                message: "Invalid OTP!"
            })
        }

        let user;

        try {
            user = await UserService.findUser({ phone })
            if (!user) {
                user = await UserService.createUser({ phone })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "db error" })
        }

        const { accessToken, refreshToken } = TokenService.generateToken({ _id: user._id, activated: false })

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        })

        const UserDto = new userDto(user)
        res.json({ accessToken, user: UserDto })
    }
}

module.exports = new AuthController();