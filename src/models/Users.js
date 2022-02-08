const Mongoose = require('mongoose')
// const logger = require('../scripts/logger/Project')
const UserSchema = new Mongoose.Schema({
    full_name: String,
    password: String,
    email: String,

}, {timestamps: true, versionKey : false})


module.exports = Mongoose.model('user', UserSchema)