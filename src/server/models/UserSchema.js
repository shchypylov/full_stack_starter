const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: {
        type: String,
        isRequired: true
    },
    password: {
        type: String,
        isRequired: true
    },
});

module.exports = mongoose.model("UserSchema", UserSchema, "users");