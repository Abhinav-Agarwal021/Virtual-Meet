const mongoose = require('mongoose')
const schema = mongoose.Schema;

const CategorySchema = new schema(
    {
        roomId: { type: schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        role: { type: String, unique: true }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Category", CategorySchema, "Channel Categories");