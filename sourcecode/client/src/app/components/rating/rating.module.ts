import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingRoutingModule } from './rating-routing.module';
import { RatingComponent } from './rating/rating.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from "../../shared/shared.module";
import { StarRatingModule } from 'angular-star-rating';
import { RatingsReviewsComponent } from './ratings-reviews/ratings-reviews.component';
import { AdvisorRatingComponent } from './advisor-rating/advisor-rating.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RatingRoutingModule,
        StarRatingModule.forRoot(),
        SharedModule
    ],
    declarations: [RatingComponent, RatingsReviewsComponent, AdvisorRatingComponent]
})
export class RatingModule { }
