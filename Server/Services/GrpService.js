const CategoryModel = require("../models/CategoryModel");

class GrpService{
    async CreateCat(data) {
        const { roomId, name, role, members } = data;

        const res = await CategoryModel.create({
            roomId,
            name,
            role,
            members
        })

        return res;
    }
}

module.exports = new GrpService();