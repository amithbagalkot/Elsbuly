export interface IIdeaStore{
    ideaCreated: boolean;
    IdeaUpdated: boolean;
    IdeaDeleted: boolean;
    hasError: boolean;
    error: string;
    GetIdea:boolean;
    result:string;
    message:string;
}

export interface IIdea{
    idea_id: number,
    advisor_id: number,
    idea_time: string,
    idea_string: string,
    script_name: string,
    actual_exchange_code: string,
    exchange_code: string,
    instrument: string,
    base_symbol: string,
    country: string,
    idea_type: string,
    idea_status: string,
    idea_status_note: string,
    idea_strength: string,
    price_at_idea_open: number,
    start_range_price: number,
    end_range_price: number,
    price_target1: number,
    price_target2: number,
    price_target3: number,
    price_stoploss: number,
    trader_note: string,
    advisor_note: string,
    price_at_idea_close: number,
    price_target1_hit: string,
    price_target1_hit_time: string,
    price_target2_hit: string,
    price_target2_hit_time: string,
    price_target3_hit: string,
    price_target3_hit_time: string,
    price_stoploss_hit: string,
    price_stoploss_hit_time: string,
    record_status_id: number,
    date_created: string,
    user_created: number,
    date_updated: string,
    user_updated: number,
    user_name:String;
    script_id: number
}
