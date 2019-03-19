import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '../config';
import { HttpClientJsonpModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { LoadingService } from './loading.service';


interface RequestObject {
    path: string,
    method: string,
    body?: object,
    headers?: any
}

@Injectable()
export class RequestSenderService {
    isloadingFalse: boolean = false;
    isLoadingTrue: boolean = true;
    constructor(private http: HttpClient, private loadingService: LoadingService) { }
    send(requestObj: RequestObject): Observable<any> {
        if (!requestObj.headers) {
            requestObj.headers = {};
        }
        if (!requestObj.headers['Content-Type']) {
            requestObj.headers['Content-Type'] = 'application/json';
        }
        
        if (localStorage.token) {
            requestObj.headers['Authorization'] = 'Bearer ' + localStorage.token;
        }
        var url = ApiConfig.HOST + requestObj.path;
        console.log(url);
        switch (requestObj.method) {
            case 'GET':
                return this.http.get<any>(url, { headers: requestObj.headers })
            case 'POST':
               return this.http.post<any>(url, requestObj.body, { headers: requestObj.headers });
            case 'PUT':
                return this.http.put<any>(url, requestObj.body, { headers: requestObj.headers });
            case 'DELETE':
                return this.http.delete<any>(url, { headers: requestObj.headers });
        }
    }
}
//https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mongolian%20grill&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=YOUR_API_KEY
