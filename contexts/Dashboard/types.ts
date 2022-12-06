import {ITask} from "models/task";
import {Dispatch, ReactNode, SetStateAction} from "react";

export interface IDashboardContext {
    tasks: ITask[];
    setTasks: Dispatch<SetStateAction<ITask[]>>;
}

export interface IDashboardContextProvider {
    children: ReactNode;
    tasks: ITask[];
}