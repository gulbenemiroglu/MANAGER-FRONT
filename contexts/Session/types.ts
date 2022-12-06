import {Dispatch, SetStateAction} from "react";

export interface IUser {
    username: string;
}

export interface ICredentials extends IUser {
    password: string;
}

export type TUser = IUser | null;

export interface ISessionContext {
    user: TUser;
    setUser: Dispatch<SetStateAction<TUser>>;
    login: (args: ICredentials) => void;
    logout: () => void;
}