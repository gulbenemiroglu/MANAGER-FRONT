import {TaskStatus} from "utils/enums";
import { IComment } from "./comment";

export interface IBaseTask {
    title: string;
    description: string;
    status: TaskStatus;
    owner: string;
}

export interface ITask extends IBaseTask{
    reaTaskId: number;
    updatedDate: Date;
    comments: IComment;
}