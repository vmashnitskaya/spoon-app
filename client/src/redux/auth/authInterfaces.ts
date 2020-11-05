export interface UserData {
    token: string;
    userId: string;
    first_name: string;
    last_name: string;
    admin: boolean;
}

export interface InitialState {
    loading: boolean;
    error: string;
    userData: UserData;
}
export interface UserInput {
    [key: string]: any;
}
