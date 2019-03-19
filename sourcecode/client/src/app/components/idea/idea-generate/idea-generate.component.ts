import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { CommonActions } from '../../../actions/common.actions';
import { IAppState } from '../../../stores';
import { ICommon } from '../../../stores/common/common.types';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { IdeaActions } from '../../../actions/idea.action';
import { Router } from '@angular/router';
import { UrlConfig } from '../../../config';
//import { successCodes } from '../../../../../../server/constants';
import { AdvisorActions }  from '../../../actions/advisor.actions';
import { Observable  } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { ConnectionService } from '../../../services/connection.service';

@Component({
  selector: 'app-idea-generate',
  templateUrl: './idea-generate.component.html',
  styleUrls: ['./idea-generate.component.css']
})

export class IdeaGenerateComponent implements OnInit  {
state;
  segments;
  exchanges;
  scripts;
  instruments;
  date: Date = new Date("12-12-2020");
  form: FormGroup;
  ideaObject:{};
  user_id;
  script_id;
  exchange_code = {exchange_code:''};
  formvaluevalue;
  connected: boolean = true;
  constructor(private advisoractions:AdvisorActions, private ngRedux: NgRedux<IAppState>, private commonAction: CommonActions,
    private toastr: ToastsManager, private ideaAction: IdeaActions, private router:Router, private fb:FormBuilder,
    private connection: ConnectionService) {
      this.state = JSON.parse(localStorage.getItem('state'));
      this.connected = this.connection.connected;
      this.connection.Changes.subscribe((state)=>{this.connected = state});
     }

  ngOnInit() {

    this.commonAction.getExchange();
    this.commonAction.getScript();
    this.commonAction.getInstrument();
    this.commonAction.getSegment();

    this.advisoractions.getSubscriptions();

    this.ngRedux.subscribe(() => {
      var state = this.ngRedux.getState();
      this.user_id = this.state.auth.user_id; 
      if (state.common.exchangeData) {
        this.exchanges = state.common.exchange;
      }

      if(state.common.instrumentData) {
        this.instruments = state.common.instrument;
      }
      if(state.common.segmentData){
        this.segments = state.common.segment;
      }
      if(state.common.scriptData){
        this.scripts=state.common.script;
        this.script_id= state.common.script_id;
      }

      if (state.common.hasError) {
        state.common.hasError=false;
        this.toastr.error(state.common.error)
      }
      if (state.ideas.ideaCreated) {
        state.ideas.ideaCreated=false;
        this.router.navigateByUrl(UrlConfig.Ideas);

        // var advisoremail={
        //   traderemail:'kranthimandava953@gmail.com',
        //   advisorname:'pikkurthy'
        // }
        //  this.advisoractions.sendEmail(advisoremail);
        this.toastr.success("Idea created ");
      }

      if(state.ideas.hasError){
        state.ideas.hasError=false;
        this.toastr.error(state.ideas.error)
      }
    });

    this.form = this.fb.group({
      exchange_code: [null, Validators.required],
      segment: [null],
      instrument_code: [null],
      script_name: [null],
      idea_type: [null, Validators.compose([Validators.required, Validators.maxLength(40)])],
      strike: [null],
      target: [null],
      price_target1: [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.maxLength(10)])],
      price_target2: [null, Validators.compose([Validators.pattern('[0-9]*', ), Validators.maxLength(10)])],
      price_target3: [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.maxLength(10)])],
      price_stoploss:[null, Validators.compose([Validators.pattern('[0-9]*'), Validators.maxLength(10)])],
      advisor_rating_note: [null],
      idea_string: [null, Validators.required],
    })
    // this.form.valueChanges.subscribe((form)=>{
    //   console.log(form);
    // });

    // this.formvaluevalue = this.form.valueChanges._finally;
    // console.log('this.formvaluevalue' + this.formvaluevalue)

    // this.form.valueChanges.debounceTime(500).distinctUntilChanged().subscribe((result)=>{
    //   console.log("result.exchange_code");
    // })
  }
  
  createIdeas() {
    this.ideaObject = {
      advisor_id: this.user_id,
      idea_time: Date.now(),
      idea_string: this.form.value.idea_string,
      script_id: 1,
      script_name: this.form.value.script_name,
      exchange_id: 1,
      exchange_code:  this.form.value.exchange_code,
      instrument_id: 1,
      instrument_code: this.form.value.instrument_code,
      base_script_code:'CPO' ,
      country: "US",
      idea_type: this.form.value.idea_type,
      idea_status: "Active",
      idea_status_note: "",
      idea_strength: "MT",
      price_at_idea_open: 100,
      start_range_price: 0,
      end_range_price: 0,
      price_target1: this.form.value.price_target1,
      price_target2:  this.form.value.price_target2,
      price_target3:  this.form.value.price_target3,
      price_stoploss: this.form.value.price_stoploss,
      trader_note: "Prepare Carry",
      advisor_note: "",
      price_at_idea_close: 0,
      dvisor_rating: 3,
      advisor_rating_note: this.form.value.advisor_rating_note,
      price_target1_hit: "",
      price_target1_hit_time: "2016-05-11 10:14:58",
      price_target2_hit: "",
      price_target2_hit_time: "2016-05-11 10:14:58",
      price_target3_hit: "",
      price_target3_hit_time: "2016-05-11 10:14:58",
      price_stoploss_hit: "",
      price_stoploss_hit_time: "2016-05-11 10:14:58"
    }
    this.ideaAction.createIdea(this.ideaObject);
  }
  reset(){
    this.form.reset();
  }
}
