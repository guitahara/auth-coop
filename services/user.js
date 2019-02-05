const CustomError = require('../error');
const User = require('../models/user/user');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const authService = require('./auth');

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
        .then( user => ({ auth: true, token: authService.signToken(user._id) }));
};

const checkIfInputIsValid = (eventBody) => {
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
        !(eventBody.login &&
          typeof eventBody.login === 'string' && eventBody.login.trim().length > 0)
    ) return Promise.reject(new CustomError('Email error. Email must have valid characters.',400));

    return Promise.resolve();
}
