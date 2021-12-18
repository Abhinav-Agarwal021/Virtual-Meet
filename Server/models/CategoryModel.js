const mongoose = require('mongoose')
const schema = mongoose.Schema;

const CategorySchema = new schema(
    {
        roomId: { type: schema.Types.ObjectId },
        name: { type: String },
        role: { type: String },
        members: { type: Array }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Category", CategorySchema, "Channel Categories");