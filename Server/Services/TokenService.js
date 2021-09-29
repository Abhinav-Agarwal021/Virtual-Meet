const jwt = require("jsonwebtoken")
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.JWT_REFERSH_TOKEN_SECRET

const refresh = require("../models/RefreshModel")

class TokenService {

    generateToken(id) {
        const accessToken = jwt.sign(id, accessTokenSecret, {
            expiresIn: "900s"
        })

        const refreshToken = jwt.sign(id, refreshTokenSecret, {
            expiresIn: "7d"
        })

        return { accessToken, refreshToken }
    }

    async storeToken(userId, token) {
        await refresh.create({
            token,
            userId,
        })
    }

}

module.exports = new TokenService()