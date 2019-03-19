import { Injectable, OnInit } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { JwtHelper } from 'angular2-jwt';
import { Router ,ActivatedRoute} from '@angular/router';

@Injectable()


export class ChatService implements OnInit{
  chatmessages;
  state;
  name;
  user_name;
  email;
  id;
  data;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private activatedRoute:ActivatedRoute, private router:Router,private db: AngularFireDatabase) {
    this.user_name = this.jwtHelper.decodeToken(localStorage.token).userName;
    this.email = this.jwtHelper.decodeToken(localStorage.token).email;
  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  getMessages(id): AngularFireList<any[]> {
    if(localStorage.getItem('typeofboard')==""||localStorage.getItem('typeofboard')==null){
      this.router.navigateByUrl('trader/ideas');
  }
     var typeofboard=localStorage.getItem('typeofboard');
      this.data=this.db.list(typeofboard, ref => ref.orderByChild('id').equalTo(id));
      return this.data;
  }
  sendMessage(msg: String, id) {
    const Timestamp = this.getTimeStamp();
    this.chatmessages = this.getMessages(id);
    this.chatmessages.push({
      id: id,
      email: this.email,
      userName: this.user_name || this.email,
      msg: msg,
      timeSent: Timestamp
    });
    //return this.http.put('https://shop-myshopk3.firebaseio.com/chat',msg)
  }
  getTimeStamp() {
    const now = new Date();
    const date_time = now.toLocaleString();
    return date_time;
  } 
}