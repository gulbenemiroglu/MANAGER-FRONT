import {createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import {useToast} from "contexts/Toast";
import {ICredentials, ISessionContext, TUser} from "contexts/Session/types";
import Navbar from "components/Navbar";

export const SessionContext = createContext<ISessionContext>({} as ISessionContext);

export const useSession = () => useContext(SessionContext);

export const SessionContextProvider: FC<PropsWithChildren<{}>> = ({children}) => {
    const {toast} = useToast();
    const {pathname, push} = useRouter();

    const [user, setUser] = useState<TUser>(null);

    const protectedAuthRoutes = ["/dashboard"];
    const protectedUnauthRoutes = ["/login", "/register"];

    const isAuthRoute = useMemo(() => protectedAuthRoutes.includes(pathname), [pathname]);
    const isUnauthRoute = useMemo(() => protectedUnauthRoutes.includes(pathname), [pathname]);

    const login = ({username, password}: ICredentials) => {
        const isSuccessful = username === "admin" && password === "123456";
        if (isSuccessful) {
            localStorage.setItem("sessionToken", "true");
            setUser({username});
            return toast({text: `Welcome, ${username}`, type: "success"});
        }

        toast({text: "Username or password is invalid.", type: "danger"});
    }

    const logout = () => {
        localStorage.clear();
        setUser(null);
    }

    const getMe = () => {
        const sessionToken = localStorage.getItem("sessionToken");

        if (sessionToken === "true") {
            setUser({username: "admin"});
        }
    }

    useEffect(() => {
        getMe();
    }, []);

    useEffect(() => {
        if (isAuthRoute && !user) {
            push("/login");
        }
        if (isUnauthRoute && user) {
            push("/dashboard");
        }
    }, [user, isAuthRoute, isUnauthRoute]);

    useEffect(() => {
        if(!isUnauthRoute && !isAuthRoute){
            push("/login");
        }
    }, [pathname]);

    return (
        <SessionContext.Provider value={{user, setUser, login, logout}}>
            {user && <Navbar/>}
            {children}
        </SessionContext.Provider>
    )

}