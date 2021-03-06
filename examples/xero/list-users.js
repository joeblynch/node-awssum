var fmt = require('fmt');
var commander = require('commander');
var awssum = require('awssum');
var oauth = awssum.load('oauth');
var xeroService = awssum.load('xero/xero');

var env            = process.env;
var consumerKey    = env.XERO_CONSUMER_KEY;
var consumerSecret = env.XERO_CONSUMER_SECRET;
var token          = env.XERO_TOKEN;
var tokenSecret    = env.XERO_TOKEN_SECRET;
// don't need the verifier

var xero = new xeroService.Xero({
    'consumerKey'    : consumerKey,
    'consumerSecret' : consumerSecret
});

xero.setToken(token);
xero.setTokenSecret(tokenSecret);

fmt.field('ConsumerKey', xero.consumerKey()     );
fmt.field('ConsumerSecret', xero.consumerSecret() );
fmt.field('Token', xero.token()          );
fmt.field('TokenSecret', xero.tokenSecret()    );

xero.GetUsers(function(err, data) {
    fmt.msg('\nget users - expecting success');
    fmt.dump(err, 'Err');
    fmt.dump(data, 'Data');
});

xero.GetUsers({ 'Where' : 'Firstname="Andrew"' }, function(err, data) {
    fmt.msg('\nget users where Firstname="Andrew" - expecting success');
    fmt.dump(err, 'Err');
    fmt.dump(data, 'Data');
});

xero.GetUsers({ 'Order' : 'LastName' }, function(err, data) {
    fmt.msg('\nget users order by LastName - expecting success');
    fmt.dump(err, 'Err');
    fmt.dump(data, 'Data');
});
