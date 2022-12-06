import {createContext, useContext} from "react";
import {IDashboardContext} from "contexts/Dashboard/types";

export const DashboardContext = createContext<IDashboardContext>({} as IDashboardContext);
export const useDashboardPage = () => useContext(DashboardContext);