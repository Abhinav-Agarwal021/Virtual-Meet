const mongoose = require('mongoose')
const schema = mongoose.Schema;

const InviteCodes = new schema(
    {
        roomId: { type: schema.Types.ObjectId },
        code: { type: String },
        expired: { type: Boolean },
        used: { type: Number }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Invites", InviteCodes, "Invites");