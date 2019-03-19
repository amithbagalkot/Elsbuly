import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../stores/index';
import { IIdea } from '../../../stores/idea';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {
  @Input() idea: IIdea;
  state;
  isLoading: boolean = true;
  rate;
  constructor(private ngRedux: NgRedux<IAppState>, private loading: LoadingService,
     private spinner: NgxSpinnerService) {
  }
  ngOnInit() {
    this.loading.isLoadingTrueValue.subscribe(value=>{
      this.isLoading=value;
      if(this.isLoading) {
        this.spinner.show();
      }
    });
    this.state = JSON.parse(localStorage.getItem("state"));
    if (this.state.auth.user_type_id == 30101) {
      this.rate = true
    }
  }
} 