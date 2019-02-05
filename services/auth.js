const User = require('../models/user/user');
const config = require('config');
const jwt = require('jsonwebtoken');
const secret = config.get('secret');
const CustomError = require('../error');
const bcrypt = require('bcrypt');

module.exports.me = (userId) => {
    return User.findById(userId, { password: 0})
        .then(user => 
            !user
            ? Promise.reject(new CustomError('No user found.',401))
            : user
        )
        .catch(err => Promise.reject(new Error(err)));
}

module.exports.login = (eventBody) => {
    return User.findOne({ login: eventBody.login })
        .then(user => 
            !user
            ? Promise.reject(new CustomError('User with that email does not exists.',401))
            : comparePassword(eventBody.password, user.password, user._id)
        )
        .then(token => ({ auth: true, token: token }))
}

const comparePassword = (eventPassword, userPassword, userId) => {
    return bcrypt.compare(eventPassword, userPassword)
        .then(passwordIsValid => 
            !passwordIsValid
            ? Promise.reject(new CustomError('the credentials do not match.',401))
            : module.exports.signToken(userId)
        );
}

module.exports.signToken = (id) => {
    return jwt.sign({ id: id }, secret , {
        expiresIn: 86400 //expires in 24 hours
    });
}