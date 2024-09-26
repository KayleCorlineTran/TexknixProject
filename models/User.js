const { Collection } = require('mongoose');
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://nhitran:22121509tn@cluster0.8jxu6.mongodb.net/project')
    .then(function () {
        console.log('Connect to DB successfull');
    })
    .catch(function (error) {
        console.log('Connect to DB fail', error);
    })
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String,
  role: String,
});

const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel