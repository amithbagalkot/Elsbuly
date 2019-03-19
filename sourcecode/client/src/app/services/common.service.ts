import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '../config';


interface RequestObject {
    path: string,
    method: string,
    body?: object,
    headers?: any
}

@Injectable()

export class commonService {
    constructor(private http: HttpClient) { }
    send(requestObj: RequestObject): Observable<any> {
        if (!requestObj.headers) {
            requestObj.headers = {};
        }
        if (!requestObj.headers['Content-Type']) {
            requestObj.headers['Content-Type'] = 'application/json'
        }
        var url = ApiConfig.HOST + requestObj.path;
        switch (requestObj.method) {
            case "GET":
                return this.http.get<any>(url, { headers: requestObj.headers });
        }
    }
}    