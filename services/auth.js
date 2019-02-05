const User = require('../models/user/user');
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

module.exports.comparePassword = (eventPassword, userPassword, userId) => {
    return bcrypt.compare(eventPassword, userPassword)
        .then(passwordIsValid => 
            !passwordIsValid
            ? Promise.reject(new CustomError('the credentials do not match.',401))
            : signToken(userId)
        );
}

module.exports.signToken = (id) => {
    return jwt.sign({ id: id }, secret , {
        expiresIn: 86400 //expires in 24 hours
    });
}

module.exports.checkIfInputIsValid = (eventBody) => {
    if (
        !(eventBody.password && eventBody.password.length >= 7)
    ) {
        return Promise.reject(new CustomError('Password error. Password needs to be longer than 8 characters.',400));
    }

    if (
        !(eventBody.name &&
          eventBody.name.length > 5 &&
          typeof eventBody.name === 'string')
    ) return Promise.reject(new CustomError('Username error. Username needs to be longer than 5 characters.',400));

    if (
        !(eventBody.email &&
          typeof eventBody.email === 'string' && eventBody.email.trim().length > 0)
    ) return Promise.reject(new CustomError('Email error. Email must have valid characters.',400));

    return Promise.resolve();
}
