const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },

    userName: {
        type: String,
        unique: true,
        required: "Username is Required"
    },
    password: {
        type: String,
        required: true,
        show: false
    },
    shows: Array
})

const User = mongoose.model("User", UserSchema);

module.exports = User;