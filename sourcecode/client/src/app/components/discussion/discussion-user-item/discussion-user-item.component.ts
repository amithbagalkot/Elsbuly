import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-discussion-user-item',
  templateUrl: './discussion-user-item.component.html',
  styleUrls: ['./discussion-user-item.component.css']
})
export class DiscussionUserItemComponent implements OnInit {

  @Input() user;
  
  constructor() { }

  ngOnInit() {
  }

}
