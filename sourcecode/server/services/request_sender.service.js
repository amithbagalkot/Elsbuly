
var http = require('http');


function send(requestObj) {
  //console.log(requestObj)
  switch (requestObj.method) {
        case 'GET':
         http.get(requestObj.url,function(res){
          var body = "";
          res.on('data', function (data) {
          console.log('data came');
          body += data;
          });
          res.on('end', function () {
          console.log('ended too');
          console.log(body)
          });
          res.on('error', function (e) {
          console.log('Problem with request: ' + e);
          });
      });
            // case 'POST':
            //    return await this.http.post(requestObj.url, requestObj.body, { headers: requestObj.headers })
            // case 'PUT':
            //     return await this.http.put(requestObj.url, requestObj.body, { headers: requestObj.headers });
            // case 'DELETE':
            //     return await this.http.delete(requestObj.url, { headers: requestObj.headers });
        } 
}
module.exports = { send }


  // return await http.get(url, function (res) {
  //   var body = "";
  //   res.on('data', function (data) {
  //     console.log('data came');
  //     body += data;
  //   });
  //   res.on('end', function () {
  //     console.log('ended too');
  //     // maybe = JSON.parse(body);
  //     // console.log(maybe.city);
  //     // response.send(maybe);
  //   });
  //   res.on('error', function (e) {
  //     console.log('Problem with request: ' + e);
  //   })
  // });

