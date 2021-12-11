const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema(
    {
        server: { type: String, required: true, unique: true },
        ownerId: { type: Schema.Types.ObjectId },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Room', roomSchema);