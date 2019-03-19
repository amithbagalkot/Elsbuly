var credentials=require('./credentials.js');
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
        type: 'login',
        user: credentials.email_id,
        pass: credentials.password
    }
    // auth: {
    //     type: 'OAuth2',
    //     user: 'kranthimandava953@gmail.com',
    //     clientId: '393246949880-j8tvghron3gjdp4blvhtnl2va56nhplp.apps.googleusercontent.com',
    //     clientSecret: '5Ydk5Onfb0rk6PM-ojnqJ7qU',
    //     access_token: "ya29.Glv6BSNU7aafKCotvFpk8LECdR1mJptssk-Gj4Oae4UEdjGf6giQctzM0PWPlo9WcM93zjFOFbH5n3J8BUuEs7bIc6SOOZ9J34ov2lq-QWH_H-50abA7XgoNcYrQ",
    //     token_type: "Bearer",
    //     expires_in: 3600,
    //     refresh_token: "1/cmQ1ncKunS2l8eV-mFFzkmjB8UAlwKbgpXJEo0JliSc",
    //     id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhjOWViOTY4ZjczNzQ0ZWFlZDQyMWU0ODAxMDE0MmJjZTUxYTA2N2YifQ.eyJhenAiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDE0NjU2MzA2MDQ0NzE5OTQyMTIiLCJlbWFpbCI6ImtyYW50aGltYW5kYXZhOTUzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiTG9pMFcxREJ2cEVqOEg0b0JhMnEtQSIsImV4cCI6MTUzMTc0MzM2NywiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tIiwiaWF0IjoxNTMxNzM5NzY3fQ.s9wyyX2H0EsZ1lQfgRDEy90Bfez8dVn0BmGMtDEtgnK8wsJoZXCKbBZhmowYN-Y3sS3F2WpvYY2-2Vm4mpYDUd9oxvp7QqNr15ZwzOagByZUmel2gbA265KjaDiHA0mArOxRR1rCqFECHWn6EdbBYL8VP-LDqL6J-PeGK1Q7CNRMyCk43VmdIrArAKpNw81Zw1rYPWXdPT0V-XfxGBxhX2SkkdaVGrSJ-jM1dWO3KLsH7xPG8BPoTG9qJokjFl_wK68QF_ccKvmO7HMFGnX9u3UKoZj5N0tC2yonvsMMHsLTOtMNEpaPUJjDf2Ug4LVXV0YFgcUp3p9U9mNuf4hhIQ"
    // }
});

 async function sendMail (toAddress, subject, content, next) {
    var mailOptions = {
        to: toAddress,
        subject: subject,
        html: content
    };
  return await smtpTransport.sendMail(mailOptions, next);
};

module.exports={sendMail};