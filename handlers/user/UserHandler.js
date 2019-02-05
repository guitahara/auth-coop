const connectToDatabase = require('../db');
const {register, getUsers} = require('../../services/user');

module.exports.getUsers = (event, context) => {
     context.callbackWaitsForEmptyEventLoop = false;

     return connectToDatabase()
        .then(getUsers)
        .then(users => ({
            statusCode: 200,
            body: JSON.stringify(users)
        }))
        .catch(err => ({
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({ message: err.message })
        }));
};

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
