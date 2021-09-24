const jwt = require("jsonwebtoken")
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET

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

}

module.exports = new TokenService()