const CustomError = require('../error');
const User = require('../models/user/user');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

const asyncbcrypthash = promisify(bcrypt.hash);

module.exports.getUsers = () => {
    return User.find({})
        .then(users => users)
        .catch(err => Promise.reject(new Error(err)));
}

module.exports.register = (eventBody) => {
    return checkIfInputIsValid(eventBody)
        .then(() => 
            User.findOne({ login: eventBody.login.trim() })
        )
        .then( user => 
            user
            ? Promise.reject(new CustomError('User with that email exists.',400))
            : asyncbcrypthash(eventBody.password, 8)
        )
        .then(hash => 
            User.create({ ...eventBody, password: hash })
        )
        .then( user => ({ auth: true, token: signToken(user._id) }));
};