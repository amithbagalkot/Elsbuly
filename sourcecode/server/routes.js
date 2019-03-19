'use strict';
const winstonErrorHandler = require('./util/winstonErrorHandler');

module.exports = function (app) {

  // Auth
  app.use('/auth', require('./modules/auth'));
  app.use('/user', require('./modules/user'));
 

  //apis

  app.use('/api/v1/advisors', require('./modules/advisor'));
  app.use('/api/v1/traders', require('./modules/trader'));
  app.use('/api/v1/ideas', require('./modules/idea'));
  app.use('/api/v1/users', require('./modules/user'));
  app.use('/api/v1/common', require('./modules/common'));
  app.use('/api/v1/communication', require('./modules/communication/pushNotification'));
  app.use('/api/v1/email',require('./modules/communication/email'));
  app.use('/api/v1/preferences', require('./modules/preferences'));
  // app.use('/api/v1/sms', require('./modules/communication/sms'));
  app.use('/api/v1/wallet',require('./modules/wallet'));
  app.use(winstonErrorHandler);
};