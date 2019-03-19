import { Component, OnInit, Input} from '@angular/core';
import { ResetAction } from '../../../actions/reset.action';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  
  user = {
    password: ""
  }
  constructor(private resetAction: ResetAction) { }

  ngOnInit() {
  }
  checkPassword(password) {
    this.resetAction.resetPassword(password)
  }
}
