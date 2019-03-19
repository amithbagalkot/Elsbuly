import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfig } from '../config';
import { Jsonp, RequestOptions } from '@angular/http';
import { User } from '../user';
//import sendOtp = new SendOtp('222374AM4mUf4iW5b30acf3');
interface RequestObj {
  path: string;
  method: string;
  body?: object;
  headers?: any
}
@Injectable()
export class RegisterService {
  constructor(private http: HttpClient, private jsonP: Jsonp) {
  }

  registerUser(userObj){
    const requestObj = {
      method: "POST",
      path: ApiConfig.REGISTER_USER,
      body: userObj,
    }

    return this.send(requestObj);
  }

  updateUser(userObj) {
    const requestObject  = {
      method: "PUT",
      path: ApiConfig.REGISTER_USER,
      body: userObj
    }
    return this.send(requestObject)
  }

  getImage() {
    const requestObject  = {
      method: "GET",
      path: ApiConfig.GET_IMAGE
    }
    return this.send(requestObject);
  }
 
  uploadImage(uploadData) {
    const requestObject = {
      method: "POST",
      path: ApiConfig.PROFILE_IMAGE,
      body: uploadData,
    }
  return this.send(requestObject);
  }

  
  getLocation(location) {
    const requestObj = {
      method: 'GET',
    }
     let googleUrl =`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&key=AIzaSyDALNS8FDTcRoPsiFBZu7Ufr7jyaSlVGLI&callback=JSONP_CALLBACK`;
   // let url       = `https://itunes.apple.com/search?term=${location}&media=music&limit=20&callback=JSONP_CALLBACK`;
   
    switch(requestObj.method) {
      case 'GET':
      return this.jsonP.get(googleUrl).toPromise().then(res=> console.log(res));
    }
  }

  apitest() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }

  addUserNotificationSubscrition(subscription) {
    const requestObj = {
      method: 'POST',
      path: ApiConfig.USER_NOTIFICATION_SUBSCRITION,
      body: subscription
    }
    return this.send(requestObj);
  }

  send(requestObj: RequestObj): Observable<any> {
    if (!requestObj.headers) {
      requestObj.headers = {}
    }
    if (requestObj.headers['Content-Type']) {
      requestObj.headers['Content_Type'] = 'application/json';
    }
    if (localStorage.token) {
      requestObj.headers['Authorization'] = `Bearer ${localStorage.token}`;
    }
    var url = `${ApiConfig.HOST}${requestObj.path}`;
    switch (requestObj.method) {
      case 'GET':
        return this.http.get(url, { headers: requestObj.headers });
      case 'POST':
        return this.http.post(url, requestObj.body, { headers: requestObj.headers });
      case 'PUT':
        return this.http.put(url, requestObj.body, { headers: requestObj.headers });
    }
  }
}
