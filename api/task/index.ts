import { taskApi } from "api";
import { IBaseTask, ITask } from "models/task";
import { TaskStatus } from "utils/enums";
import { statusHandler } from "utils/helpers";

const PREFIX = "/ReaTask"

export const getAllTasks = async () => {
    const { data } = await taskApi.get<ITask[]>(PREFIX + "/getAll");
    return data.map((i) => ({
        ...i,
        status: statusHandler(i.status) as TaskStatus
    }));
}

export const updateTask = async (task: ITask) => {
    const updatedTask = { ...task, status: statusHandler(task.status) }
    await taskApi.put(PREFIX +"/update", updatedTask);
    return await getAllTasks();
}

export const createTask = async (task: IBaseTask) => {
    const now = new Date();
    const createdTask = { ...task, status: statusHandler(task.status), updatedDate: now, comments: [] };
    await taskApi.post(PREFIX +"/add", createdTask);
    return await getAllTasks();
}

export const deleteTask = async (task: ITask) => {
    const deletedTask = { ...task, status: statusHandler(task.status) }
    await taskApi.delete(PREFIX + `/delete/${task.reaTaskId}`, {
        data: deletedTask
    });
    return await getAllTasks();
}