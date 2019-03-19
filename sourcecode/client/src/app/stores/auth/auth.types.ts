export interface IAuthStore {
    loggedIn:boolean,
    hasError:boolean,
    error:string,
    isLoading:boolean,
    loggedinUser:IUser,
    loggedInStatus: boolean,
    user_type_id;
    user_id: number;
    userinfo:any;
    loggedOut: boolean
}

export interface IUser {
    username: String;
    email: String;
}