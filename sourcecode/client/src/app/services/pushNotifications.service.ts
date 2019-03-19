import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from './register.service';
import { NgNoValidate } from '@angular/forms/src/directives/ng_no_validate_directive';


@Injectable()
export class PushNotificationsService {
    public permissionGranted: string;
    public permission: Permission;
    constructor(private registerService: RegisterService) {
        this.permission = this.isSupported() ? 'default' : 'denied';

    }
    isSupported(): boolean {
        return 'Notification' in window;
    }

    requestPermission(): any {
        let self = this;
        if ('Notification' in window) {
            Notification.requestPermission(status => {
                if ('serviceWorker' in navigator) {
                    console.log('it is working');
                    const subscribeOptions = {
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(
                            'BFJl_hfAXqsp4NqukJ9wdD8111kuylmRoLvLmuQ7GvBsTbhKTU9RYLl-H_3Y7We4U1B6mqEl1Btg7jpOQHZ4bcA'
                        )
                    };
                    const result = navigator.serviceWorker.getRegistration();
                    navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
                        serviceWorkerRegistration.pushManager.subscribe(subscribeOptions).then(pushSubscription => {
                            this.registerService.addUserNotificationSubscrition(pushSubscription)
                                .subscribe((res) => { console.log(res) });
                        });
                    }).catch(function (error) {
                        console.log('error', error);
                    });

                }
                function urlBase64ToUint8Array(base64String) {
                    var padding = '='.repeat((4 - base64String.length % 4) % 4);
                    var base64 = (base64String + padding)
                        .replace(/\-/g, '+')
                        .replace(/_/g, '/');

                    var rawData = window.atob(base64);
                    var outputArray = new Uint8Array(rawData.length);

                    for (var i = 0; i < rawData.length; ++i) {
                        outputArray[i] = rawData.charCodeAt(i);
                    }
                    return outputArray;
                }
                return self.permission = status;
            });
        }
    };

    subscribeToUser() {
        let self = this;

        function urlBase64ToUint8Array(base64String) {
            var padding = '='.repeat((4 - base64String.length % 4) % 4);
            var base64 = (base64String + padding)
                .replace(/\-/g, '+')
                .replace(/_/g, '/');

            var rawData = window.atob(base64);
            var outputArray = new Uint8Array(rawData.length);

            for (var i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }
    }

    create(title: string, options?: PushNotification): any {
        let self = this;
        return new Observable(obs => {
            if (!('Notification' in window)) {
                console.log('Notification are not avalibale in this environment');
                obs.complete();
            }
            if (self.permission !== 'granted') {
                console.log("user hasn't granted permission to push notifications");
                obs.complete();
            }
            if (self.permission == 'granted') {
                console.log('permission granted');
                let _notify = new Notification(title, options);
                _notify.onshow = function (e) {
                    return obs.next({
                        notification: _notify,
                        event: e
                    });
                };
                _notify.onclick = function (e) {
                    return obs.next({
                        notification: _notify,
                        event: e
                    });
                };
                _notify.onerror = function (e) {
                    return obs.next({
                        notification: _notify,
                        event: e
                    });
                };
                _notify.onclose = function (e) {
                    return obs.complete();
                };
            }

        });
    };

    generateNotification(source: Array<any>): void {
        let self = this;
        source.forEach((item) => {
            let options = {
                body: item.alertContent,
                icon: "../resource/images/logo.png"
            };
            let notify = self.create(item.title, options);
        })
    }
}
export declare type Permission = 'denied' | 'granted' | 'default';

export interface PushNotification {
    body?: string;
    icon?: any;
    tag?: string,
    data?: any,
    renotify?: boolean,
    silent?: boolean,
    sound?: string,
    noscreen?: boolean,
    sticky?: boolean,
    dir?: 'auto' | 'ltr' | 'rtl',
    lang?: string,
    vibrate?: number[]
}