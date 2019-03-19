import { INITIAL_STATE } from './wallet.initial';
import * as Wallet from '../../constants/wallet.constants';
import { IWallet } from "./wallet.types";
export function walletReducer(
    state: IWallet = INITIAL_STATE, action) {

    switch (action.type) {
        case Wallet.GET_WALLET_SUCCESS:
            state.get_wallet_amount = true,
            state.hasError = false,
            state.error = null,
            state.payment_amount = action.payload.data
            return state;
        case Wallet.MONEY_WALLET_ADDED:
            state.add_wallet_amount=true,
            state.hasError = false,
            state.error = null
            return state;
        case Wallet.GET_WALLET_ERROR:
            state.hasError = false,
            state.error = null
            return state;

        case Wallet.GET_TRANSACTION_SUCCESS:
            state.get_transction = true;
            state.transaction_data = action.payload.data;
            state.hasError = false,
            state.error = null;
            return state;

        case Wallet.GET_TRANSACTION_ERROR:
            state.get_transction = false;
            state.transaction_data =null;
            state.hasError = true;
            state.error= action.payload;
            return state;

        default:
            return state;
    }
}