interface User{
    id:string;
    fullName:string;
    gender:string;
    profilePicture:string;
}

export interface IAuthState{
    user:User;
    isCheckingAuth:boolean;
    isLoading:boolean;
    error:string|null;
    isAuthenticated:boolean;
    message:string|null,
    checkAuth:Function;
    loginUser:Function;
}