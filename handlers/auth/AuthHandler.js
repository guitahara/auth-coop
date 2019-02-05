const connectToDatabase = require('../db');
const {login,me} = require('../../services/auth');

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