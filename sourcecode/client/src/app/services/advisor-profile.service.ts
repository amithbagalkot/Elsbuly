import { DiscusionJoinAction } from "../actions/discussion-Join.action";
import { Injectable } from '@angular/core';

@Injectable()
export class AdvisorProfileService {
    advisors;
    advisor = [];
    constructor(private discussionJoinAction: DiscusionJoinAction) {
        this.advisors = [
            {
                "advisorId": 1, "advisorName": "name1", "ratings": "4", "Idea": "Idea NSE Low", "exchange": "NSE"
            },
            {
                "advisorId": 2, "advisorName": "name2", "ratings": "5", "Idea": "Idea BSE Low", "exchange": "BSE"
            },
            {
                "advisorId": 3, "advisorName": "name3", "ratings": "4", "Idea": "Idea NSE High", "exchange": "NSE"
            }
        ];
    };

    getAdvisors() {
        return this.advisors;
    }

    subscribe(advisor) {
        for (let key in this.advisor) {
            if (this.advisor[key]["advisorId"] == advisor.advisorId) {
                alert("already subscribed");
                return null;
            }
        }
        this.advisors.forEach((singleAdvisor) => {

            if (singleAdvisor.advisorId === advisor.advisorId) {
                this.advisor.push(advisor);
            }

        });
    }

    addWallet() {

    }
};