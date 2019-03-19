import { Component, OnInit } from '@angular/core';
import { RatingAction } from '../../../actions/rating.action';
import { ActivatedRoute } from '@angular/router';
import { IAppState } from '../../../stores/index';
import { NgRedux } from '@angular-redux/store';
import { DiscusionJoinAction } from '../../../actions/discussion-Join.action';
@Component({
  selector: 'app-ratings-reviews',
  templateUrl: './ratings-reviews.component.html',
  styleUrls: ['./ratings-reviews.component.css']
})
export class RatingsReviewsComponent implements OnInit {
  id: any;
  no_ratings_reviews: boolean = false;
  ratings_reviews:boolean;
  sum_rating = 0;
  rating;
  five_star_users;
  four_star_users;
  three_star_users;
  two_star_users;
  one_star_users;
  rating_reviews;
  ratings=[];
  five_counter=0;
  four_counter=0;
  three_counter=0;
  two_counter=0;
  one_counter=0;
  idea;

  constructor(private discussionactionJoin: DiscusionJoinAction,private ngRedux: NgRedux<IAppState>, private ratingAction: RatingAction, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id){
      this.discussionactionJoin.getIdea(this.id);
    }
    this.ratingAction.getRatings(this.id);
    this.ngRedux.subscribe(() => {
         var dis_state=this.ngRedux.getState();
         if (dis_state.discussionJoin.discussionJoin) {
          this.idea = dis_state.discussionJoin.result; 
     //getting single idea from discusion join action
        }
      var state = this.ngRedux.getState().rating;
        this.rating_reviews=state.result;
    
      if (state.isRating&&state.result.length >= 1) {
        this.ratings_reviews=true;
        for (var i = 0; i < state.result.length; i++) {

          // this.sum_rating =state.result[i].reduce((a) => a + b, 0);
          //this.sum_rating = +this.sum_rating + +state.result[i].idea_rating;
                 this.ratings.push(parseInt(state.result[i].idea_rating));
                //  this.sum_rating=this.ratings.reduce((a,b) => a + b, 0);
                //  var decimal_rating = this.sum_rating / state.result.length;
                //  this.rating = Math.round(decimal_rating * 10) / 10;
                       

          if (state.result[i].idea_rating == 5) {

                       this.five_counter++;
              //this.five_star_users = counter ;
   
          }
          this.five_star_users = this.five_counter;

          if (state.result[i].idea_rating == 4) {
            // this.four_star_users = i;
                 this.four_counter++;
          }
          this.four_star_users = this.four_counter;
          if (state.result[i].idea_rating == 3) {
            this.three_counter++;
          }
          this.three_star_users = this.three_counter;

          if (state.result[i].idea_rating == 2) {
            this.two_counter++;
          }
          this.two_star_users = this.two_counter;
          if (state.result[i].idea_rating == 1) {

            this.one_counter++;
          }
          this.one_star_users = this.one_counter;
        }
        this.sum_rating=this.ratings.reduce((a,b) => a + b, 0);
       var decimal_rating = this.sum_rating / state.result.length;
       this.rating = Math.round(decimal_rating * 10) / 10;
      }
      state.isRating=false;
      if (state.result.length == 0) {
        this.no_ratings_reviews = true;
        this.ratings_reviews=false;
      }
      // if (state.result.length == 1) {
      //   this.rating = state.result[0].idea_rating;
      // }
    });

  }
}
