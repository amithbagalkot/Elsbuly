import { IdeaComponent } from '../components/idea/idea/idea.component';
import { Injectable,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { ApiConfig } from "../config";

interface RequestObject {
    path: string,
    method: string,
    body?: object,
    headers?: any
}

@Injectable()
export class DiscussionService {
 public idea_id;
    constructor(private http: HttpClient) { }
    send(requestObj: RequestObject): Observable<any> {
        if (!requestObj.headers) {
            requestObj.headers = {};
        }
        if (!requestObj.headers['Content-Type']) {
            requestObj.headers['Content-Type'] = 'application/json'
        }
        if(localStorage.token){
            requestObj.headers['Authorization']="Bearer "+ localStorage.token
        }
        var url = ApiConfig.HOST + requestObj.path
      console.log(url)
     
        switch (requestObj.method) {
            case "GET":
                return this.http.get<any>(url, { headers: requestObj.headers });
            case "POST":
                  return this.http.post<any>(url,requestObj.body, { headers: requestObj.headers });  
        }
    }
   
}
