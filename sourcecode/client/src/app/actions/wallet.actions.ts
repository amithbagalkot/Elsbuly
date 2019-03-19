import { RequestSenderService } from '../services/request-sender.service';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState } from '../stores';
import { ApiConfig, PathConfig } from '../config';
import * as Wallet from '../constants/wallet.constants';
@Injectable()
export class WalletAction {
    constructor(private requestService: RequestSenderService, private ngRedux: NgRedux<IAppState>) {}
   

    addWallet( payment_amount) {
        this.requestService.send({
                method : 'POST',
                path: ApiConfig.ADD_WALLET,
                body: {
                    payment_amount
                }
        }).subscribe((res)=>{
            this.walletAdded(res);
            this.getTransactionDetails();
            this.getWallet();
        }), (err)=>{
            this.walletError(err);
        }
    };

    walletAdded(res){
        this.ngRedux.dispatch({
            type: Wallet.MONEY_WALLET_ADDED,
            payload: res
        })
    }
    walletError(errObj){
        this.ngRedux.dispatch({
            type: Wallet.GET_WALLET_ERROR,
            payload: errObj.err
        })
    }
    getWallet(){
        this.requestService.send({
            method: 'GET',
            path: ApiConfig.GET_WALLET,
           
        }).subscribe((res)=>{
            this.getWalletSuccess(res);
        }), (err)=>{
            this.getWalletError(err);
        }
    }
    getWalletSuccess(res) {
        this.ngRedux.dispatch({
            type: Wallet.GET_WALLET_SUCCESS,
            payload: res
        })
    }
    getWalletError(errObj) {
        this.ngRedux.dispatch({
            type: Wallet.GET_WALLET_ERROR,
            payload: errObj.err
        })
    }

    getTransactionDetails() {
        this.requestService.send({
            method: 'GET',
            path: ApiConfig.GET_TRANSACTION
        }).subscribe((res)=>{
            this.ngRedux.dispatch({
                type: Wallet.GET_TRANSACTION_SUCCESS,
                payload: res
            })
        }, (err)=>{  this.ngRedux.dispatch({
            type: Wallet.GET_TRANSACTION_ERROR,
            payload: err
        })
    })
    }

}