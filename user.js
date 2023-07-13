const mongoose = require('mongoose')


const Schema = mongoose.Schema
const model = mongoose.model

const userSchema = new Schema({
   _id: {
       type: Number
   },
    name: {
        type: String
    },
    age: {
        type: Number
    },
    salary: {
        type: Number
    },
    married: {
        type: Boolean
    }

}, {collection: 'usersProfile'})

const User = model('User', userSchema)


module.exports = User