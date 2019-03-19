import { Observable, Subject } from 'rxjs';

export class CheckIdeaService {
    private ideaStaus = new Subject<any>();

    constructor() {}

    changeIdeaStatus(e: boolean) {
        this.ideaStaus.next(e)
    }

    get ideaStats() {
        return this.ideaStaus;
    }
}