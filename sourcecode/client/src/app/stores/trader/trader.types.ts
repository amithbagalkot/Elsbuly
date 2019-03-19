export interface ITrader{
    subScribe:boolean;
    hasError:boolean;
    error:String;
    result?:String;
    getSubscriptions?:String;
    getTraderSubscriptions:boolean;
    getAdviosrIdeas:boolean;
    cancelSubscription:boolean
}