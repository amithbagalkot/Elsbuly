import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PreferenceService {
    value: boolean = true;
    advisorPreferenceValue: boolean = true;
    profilePreferenceValue: boolean = true;
    private ideaPreferenceChange = new BehaviorSubject(this.value);
    private advisorPreferenceChange = new BehaviorSubject(this.advisorPreferenceValue);
    private profilePreferenceChange = new BehaviorSubject(this.profilePreferenceValue);

    ideaPreferenceValueChange = this.ideaPreferenceChange.asObservable();
    advisorPreferenceValueChange = this.advisorPreferenceChange.asObservable();
    profilePreferenceValueChange = this.profilePreferenceChange.asObservable();



    constructor() { }

    ideaPreferenceChanges(value) {
        this.ideaPreferenceChange.next(value);
    }
    advisorPreferenceChanges(value) {
        this.advisorPreferenceChange.next(value);
    }
    profilePreferenceChanges(value) {
        this.profilePreferenceChange.next(value);

    }

}