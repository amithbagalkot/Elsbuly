import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RatingComponent } from './rating/rating.component';
import { RatingsReviewsComponent } from './ratings-reviews/ratings-reviews.component';
import { AdvisorRatingComponent } from './advisor-rating/advisor-rating.component';
export const routes: Routes = [
    {
        path: "",
        component: AdvisorRatingComponent
    },
    {
        path: "ratings_reviews/:id",
        component: RatingsReviewsComponent
    },
    {
        path: "rating/:id",
        component: RatingComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RatingRoutingModule {

}