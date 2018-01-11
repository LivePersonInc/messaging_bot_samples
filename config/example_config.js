/* Template
{
    accountId: Number, // always mandatory
    username: String, // the bot user's login name - mandatory when using username/password or oAuth
    password: String, // bot user's password - mandatory when using username/password
    token: String, // a valid bearer token -  used with userId instead of username/password or SAML or oAuth
    userId: String, // the bot user's userId - mandatory when using token authentication
    assertion: String, // a SAML assertion - used instead of token or username/password or oAuth
    appKey: String, // oAuth1 key - used with username and 3 other oAuth1 params instead of SAML or token or username/password
    secret: String, // oAuth1 secret - used with username and 3 other oAuth1 params instead of SAML or token or username/password
    accessToken: String, // oAuth1 token - used with username and 3 other oAuth1 params instead of SAML or token or username/password
    accessTokenSecret: String, // oAuth1 token secret - used with username and 3 other oAuth1 params instead of SAML or token or username/password
    csdsDomain: String, // override the CSDS domain if needed
    requestTimeout: Number, // default to 10000 milliseconds
    errorCheckInterval: Number, // defaults to 1000 milliseconds
    apiVersion: Number // Messaging API version - defaults to 2 (version 1 is not supported anymore)
}*/

module.exports = {
    // Dev account (account number 12345678)
    '12345678': {
        'mbolton@initech.com' : {
            accountId: 12345678,
            username: 'mbolton@initech.com',
            password: 'Password!'
        },
        'TestBot' : {
            accountId: 12345678,
            username: 'TestBot',
            appKey: '610822d6ffce8b79068b913beedcc022',
            secret: '24857c92d392d1ea',
            accessToken: 'b27fa97603c3efcb50cdf20c7edf94ab',
            accessTokenSecret: '601d7bc46b0ad5ec'
        }
    },
    // Production account (account number 98765432)
    '987654321': {
        'routing_bot': {
            accountId: 98765432,
            username: 'routing_bot',
            appKey: '610822d6ffce8b79068b913beedcc022',
            secret: '24857c92d392d1ea',
            accessToken: 'b27fa97603c3efcb50cdf20c7edf94ab',
            accessTokenSecret: '601d7bc46b0ad5ec'
        },
        'tone_analysis_bot': {
            accountId: 98765432,
            username: 'tone_analysis_bot',
            appKey: '610822d6ffce8b79068b913beedcc022',
            secret: '24857c92d392d1ea',
            accessToken: 'b27fa97603c3efcb50cdf20c7edf94ab',
            accessTokenSecret: '601d7bc46b0ad5ec'
        }
    }
};