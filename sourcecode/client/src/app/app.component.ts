import { Component, OnInit, ViewContainerRef, AfterContentChecked, ViewChild, ElementRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './stores';
import { RegisterService } from './services/register.service';
import { Observable } from 'rxjs';
import { PushNotificationsService } from './services/pushNotifications.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = 'app';
  constructor(public toastr: ToastsManager, vRef: ViewContainerRef, private ngRedux: NgRedux<IAppState>,
    private registerService: RegisterService, private ngxSpinner: NgxSpinnerService, private loading: LoadingService) {
    this.toastr.setRootViewContainerRef(vRef);
    localStorage.removeItem('firebase:previous_websocket_failure');
  }
  @ViewChild('scroller') private myScrollContainer: ElementRef;
  ngOnInit() {
    this.ngxSpinner.show();
    this.loading.isLoadingTrueValue.subscribe(value=>{
      setTimeout(()=>{
        this.ngxSpinner.hide();
      }, 1000);
    });
}
}