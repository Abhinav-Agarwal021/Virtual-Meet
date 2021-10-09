const jwt = require("jsonwebtoken")
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.JWT_REFERSH_TOKEN_SECRET

const refresh = require("../models/RefreshModel")

class TokenService {

    generateToken(id) {
        const accessToken = jwt.sign(id, accessTokenSecret, {
            expiresIn: "1s"
        })

        const refreshToken = jwt.sign(id, refreshTokenSecret, {
            expiresIn: "7d"
        })

        return { accessToken, refreshToken }
    }

    async storeToken(userId, token) {
        try {
            await refresh.create({
                token,
                userId,
            })
        } catch (error) {
            console.log(error)
        }
    }

    async verifyAccessToken(token) {
        return jwt.verify(token, accessTokenSecret)
    }

    async verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, refreshTokenSecret);
    }

    async findRefreshToken(userId, refreshToken) {
        return await refresh.findOne({
            userId: userId,
            token: refreshToken,
        });
    }

    async updateRefreshToken(userId, refreshToken) {
        return await refresh.updateOne(
            { userId: userId },
            { token: refreshToken },
        );
    }

}

module.exports = new TokenService()