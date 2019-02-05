const connectToDatabase = require('../db');
const User = require('../user/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const secret = config.get('secret');
const CustomError = require('../error');
const { promisify } = require('util');

const asyncbcrypthash = promisify(bcrypt.hash);

module.exports.register = (event, context) => {
    context.callbackWatisForEmptyEventLoop = false;

    return connectToDatabase()
        .then(() => register(JSON.parse(event.body)))
        .then(session => ({
            statusCode: 200,
            body: JSON.stringify(session)
        }))
        .catch(err => ({
            statusCode: err.statusCode || 500,
            body: JSON.stringify({message:err.message})
        }));
};

module.exports.login = (event, context) => {
    context.callbackWatisForEmptyEventLoop = false;

    return connectToDatabase()
        .then(() => 
            login(JSON.parse(event.body))
        )
        .then(session => ({
            statusCode: 200,
            body: JSON.stringify(session)
        }))
        .catch(err => ({
            statusCode: err.statusCode || 500,
            body: JSON.stringify({message: err.message })
        }));
};

module.exports.me = (event, context) => {
    context.callbackWatisForEmptyEventLoop = false;

    return connectToDatabase()
        .then(() => 
            me(event.requestContext.authorizer.principalId)
        )
        .then(session => ({
            statusCode: 200,
            body: JSON.stringify(session)
        }))
        .catch(err => ({
            statusCode: err.statusCode || 500,
            body: JSON.stringify({ message: err.message })
        }));
};

function me(userId) {
    return User.findById(userId, { password: 0})
        .then(user => 
            !user
            ? Promise.reject(new CustomError('No user found.',401))
            : user
        )
        .catch(err => Promise.reject(new Error(err)));
}

function login(eventBody) {
    return User.findOne({ email: eventBody.email })
        .then(user => 
            !user
            ? Promise.reject(new CustomError('User with that email does not exists.',401))
            : comparePassword(eventBody.password, user.password, user._id)
        )
        .then(token => ({ auth: true, token: token }))
}

function comparePassword(eventPassword, userPassword, userId) {
    return bcrypt.compare(eventPassword, userPassword)
        .then(passwordIsValid => 
            !passwordIsValid
            ? Promise.reject(new CustomError('the credentials do not match.',401))
            : signToken(userId)
        );
}

function signToken(id) {
    return jwt.sign({ id: id }, secret , {
        expiresIn: 86400 //expires in 24 hours
    });
}

function checkIfInputIsValid(eventBody) {
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

function register(eventBody) {
    return checkIfInputIsValid(eventBody)
        .then(() => 
            User.findOne({ email: eventBody.email.trim() })
        )
        .then( user => 
            user
            ? Promise.reject(new CustomError('User with that email exists.',400))
            : asyncbcrypthash(eventBody.password, 8)
        )
        .then(hash => 
            User.create({ name: eventBody.name, email: eventBody.email, password: hash })
        )
        .then( user => ({ auth: true, token: signToken(user._id) }));
};