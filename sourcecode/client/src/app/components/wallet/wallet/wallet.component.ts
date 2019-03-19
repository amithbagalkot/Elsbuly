import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../stores'; 
import { WalletAction } from '../../../actions/wallet.actions';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
amount;
user_id;
balanceAmount;
addAmount : number;
transaction_data ;


displayedColumns = ['Date', 'Amount', 'Transaction'];

  constructor(private ngRedux: NgRedux<IAppState>, private walletAction: WalletAction) { }
 
  ngOnInit() {

    this.walletAction.getTransactionDetails();
   this.walletAction.getWallet();
  this.ngRedux.subscribe(()=>{
    var state= this.ngRedux.getState();
    // this.user_id = state.auth.user_id;
    // console.log(this.user_id);
    if(state.wallet.get_wallet_amount){
     
        this.amount= state.wallet.payment_amount;
    }
    if(state.wallet.get_transction) {
      this.transaction_data = state.wallet.transaction_data;
      this.transaction_data.forEach(element => {
      });
    }
   })


  }

   addWallet(){
    this.walletAction.addWallet( this.addAmount);
    this.addAmount = null;
  }
}
