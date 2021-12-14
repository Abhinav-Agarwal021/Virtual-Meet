const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema(
    {
        server: { type: String, required: true, unique: true },
        /*ownerId: { type: Schema.Types.ObjectId, required: true },
        participant: { type: Schema.Types.ObjectId },*/
        members: { type: Array }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Room', roomSchema);