import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingService {
    loading: boolean = true;
    private isLoading = new BehaviorSubject(this.loading);

    isLoadingTrueValue = this.isLoading.asObservable();
    isLoadingFalseValue = this.isLoading.asObservable();
    constructor(private spinner: NgxSpinnerService) {
    }
    isLoadingTrue(value) {
        return this.isLoading.next(value);
    }
    isLoadingFalse(value) {
        return this.isLoading.next(value);
    }
}