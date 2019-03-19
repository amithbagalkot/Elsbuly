import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


export class ConnectionService {
    private connEvents: Subject<boolean>;

    constructor() {
        this.connEvents = new Subject();
        window.addEventListener('online', e => this.handleConnectionChange(e));
        window.addEventListener('offline', e => this.handleConnectionChange(e));
    }

    private handleConnectionChange(e) {
        this.connEvents.next(this.connected);
    }

    get connected(): boolean {
        return window.navigator.onLine;
    }

    get Changes(): Observable<boolean> {
        return this.connEvents;
    }

}