
import { Component, OnInit } from '@angular/core';
import { RatingAction } from '../../../actions/rating.action';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../stores';
import { IRating } from '../../../stores/rating/rating.types';
// import { IStarRatingOnClickEvent, IStarRatingOnRatingChangeEven } from "angular-star-rating/src/star-rating-struct";
import { ClickEvent, HoverRatingChangeEvent, RatingChangeEvent } from 'angular-star-rating';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscusionJoinAction } from '../../../actions/discussion-Join.action';
import { IIdea } from '../../../stores/idea';
import { UrlConfig } from '../../../config';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'my-form-component',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  ideaRating1: ClickEvent;
  ideaRating: RatingChangeEvent;
  ideaRatingNote: String
  data: any;
  id  : number;
  idea: IIdea;

  constructor(private toastr: ToastsManager,private ratingAction: RatingAction, private ngRedux: NgRedux<IAppState>,
    private activatedRoute: ActivatedRoute, private discussionJoin: DiscusionJoinAction, private route: Router) { }
  form = new FormGroup({
    textArea: new FormControl('')
  });

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.discussionJoin.getIdea(this.id);
    }

    this.ngRedux.subscribe(() => {
      var state = this.ngRedux.getState();
      if (state.rating.isRating) {
        state.rating.isRating = false;        
         if(state.rating.result.statusCode === 200){
          this.form.reset();
          this.toastr.success("SuccessFully Rated the Idea"); 
            //this.route.navigateByUrl(`${UrlConfig.RATINGREVIEWS}/${this.id}`);    
         }else{
          this.form.reset();
          this.toastr.error(state.rating.result[0].o_return_value);
         }
          //this.route.navigateByUrl(`${UrlConfig.DISCUSSION_JOIN}/${this.id}`);
      }
      if (state.discussionJoin.discussionJoin) {
        this.idea = state.discussionJoin.result;
      }
      if (state.discussionJoin.discussionJoin){
        this.idea=state.discussionJoin.result;
      }
    })
  };

  onClick = ($event: ClickEvent) => {
        var ratings=$event;
    this.ideaRating = ratings;
  };

  createRating() {
    this.data = {
      ideaRating: this.ideaRating.rating,
      ideaRatingNote: this.form.value.textArea
    };
    this.ideaRating = this.data.ideaRating;
    this.ideaRatingNote = this.data.ideaRatingNote
    this.ratingAction.createRating(this.id, this.ideaRating, this.ideaRatingNote);
  };
}
