const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        //关联
        ref: 'users'
    },
    img: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    imgs: {
        type: [String],
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model("profiles",ProfileSchema);