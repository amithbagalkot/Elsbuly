import { Component, OnInit, AfterContentChecked, Input, Output } from '@angular/core';
import { IIdea } from '../../../stores/idea/idea.types';
import { FilterPipe } from '../../../filter/filter.pipe';
import { CheckIdeaService } from '../../../services/checkIdea.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-idealist',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.css']
})

export class IdealistComponent implements OnInit {

  @Input() Ideas: IIdea[];
  @Input() exchanges: IIdea[];
  @Input() advisorNames: IIdea[];
  selectedValue;
  display1: boolean = false;
  display2: boolean = false;
  localState;
  user_type_id;
  exchange_search: null;
  advisor_search: null;
  script_search: null;
  filter_show: boolean = true;
  ideaStatuss: boolean = false;
  filteredList = [];

  constructor(private checkIdea: CheckIdeaService ) {
    this.checkIdea.ideaStats.subscribe(status=>{this.ideaStatuss = status});
    this.localState = JSON.parse(localStorage.getItem("state"));

    if (this.localState.auth.user_type_id === 30102) {
      this.user_type_id = true;
    }
    if (this.localState.auth.user_type_id === 30101) {
      this.user_type_id = true;
    }
    if (this.localState.auth.user_type_id === 30103) {
      this.user_type_id = false;
    }
  }
  ngOnInit() {
  }

  optionsSelected(event) {
    this.exchange_search = event.target.value;
    this.display2 = true;
  }

  trackByFn(index, idea) {
    return idea;
  }

}