//'use strict';

var loopback = require('loopback');
var path = require('path');
var lcs = require('loopback-connector-soap');
var dotenv = require('dotenv').config();
var bodyParser = require('body-parser');
var boot = require('loopback-boot');

var app = module.exports = loopback();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



app.set('restApiRoot', '/api');

var ds = loopback.createDataSource('soap',
{
   connector: lcs,
   security: {
     scheme: 'BasicAuth',
     username: process.env.SAP_USER,
     password: process.env.SAP_PWD
},
remotingEnabled: true,
wsdl: path.join(__dirname, './accounts.wsdl'),
//service endpoint
url: 'https://my334289.sapbydesign.com/sap/bc/srt/scs/sap/querycustomerin1'
//url: 'http://127.0.0.7:8000'

 });
// Unfortunately, the methods from the connector are mixed in asynchronously
// This is a hack to wait for the methods to be injected
ds.once('connected', function () {

//console.log(process.env.SAP_USER, process.env.SAP_PWD);
  // Create the model
  var AccountsService = ds.createModel('AccountsService', {});

  //Refine the methods
  AccountsService.GetAccountByPhoneNumber = function (phonenum, cb) {
    console.log(phonenum);

    AccountsService.FindByCommunicationData(
      {
        CustomerSelectionByCommunicationData:{
          SelectionByNormalisedTelephoneNumber: //type: CustomerSelectionByNormalisedTelephoneNumber
          {
            InclusionExclusionCode: "I",        //type: InclusionExclusionCode
            IntervalBoundaryTypeCode: "1",
            LowerBoundaryNormalisedTelephoneNumber:"*"+phonenum+"*",
          }
        }

        }, function (err, response) {
            console.log('Response: ', response); //need to handle response better
            var result = (!err && response.ProcessingConditions.LastReturnedObjectID) ?
              response.ProcessingConditions.LastReturnedObjectID : ["0"];
            
            var account = {"Account":
                            {"Id":result}
                          }
            console.log(account);
            cb(err, account);
            //console.log('')
            //response.Customer[0].UUID
          });

  }

  // Map to REST/HTTP
  loopback.remoteMethod(
    AccountsService.GetAccountByPhoneNumber, {
      accepts: [
        {arg: 'PhoneNumber', type: 'string', required: true,
          http: function(ctx){
            var req = ctx.req;
            var body = req.body;
            var ph = body.PhoneNumber;
            //var a = JSON.parse(body);
            return ph;
          }
          }
              ],
              returns: {arg: 'Account', type: 'object', root: true},
              http: {verb: 'post', path: '/GetAccountByPhoneNumber'}
            }
  );


  // Expose to REST
  app.model(AccountsService);

  // LoopBack REST interface
  app.use(app.get('restApiRoot'), loopback.rest());
// API explorer (if present)
  try {
    var explorer = require('loopback-explorer')(app);
    app.use('/explorer', explorer);
    app.once('started', function (baseUrl) {
      console.log('Browse your REST API at %s%s', baseUrl, explorer.route);
    });
  } catch (e) {
    console.log(
      'Run `npm install loopback-explorer` to enable the LoopBack explorer'
    );
  }

  app.use(loopback.urlNotFound());
  app.use(loopback.errorHandler());

  if (require.main === module)
    app.start();


});

app.start = function() {
  // start the web server
  return app.listen(5000, function() {
    app.emit('started');
    var baseUrl = 'http://127.0.0.1:5000';// app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

/*
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
*/
