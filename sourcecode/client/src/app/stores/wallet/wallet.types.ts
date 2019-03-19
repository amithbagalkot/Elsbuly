export interface IWallet{
    get_wallet_amount:boolean,
    add_wallet_amount:boolean,
    get_transction: boolean,
    payment_amount:string,
    error:String,
    transaction_data: string;
    hasError:boolean
} 