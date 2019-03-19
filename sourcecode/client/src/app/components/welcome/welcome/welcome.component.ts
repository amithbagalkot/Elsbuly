import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConfig } from '../../../config';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, AfterContentChecked{

  constructor(private router: Router, private loading: LoadingService) { }

  ngOnInit() {
  }
  ngAfterContentChecked() {
    this.loading.isLoadingFalse(false);
  }

  registerPhone(){
    this.router.navigateByUrl(UrlConfig.REGISTER)
  }
  login(){
    this.router.navigateByUrl(UrlConfig.LOGIN)
  }
}
