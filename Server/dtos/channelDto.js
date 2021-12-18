class ChannelDto {
    id;
    categoryId;
    name;

    constructor(channel) {
        this.id = channel.id;
        this.categoryId = channel.categoryId;
        this.name = channel.name;
    }
}

module.exports = ChannelDto;