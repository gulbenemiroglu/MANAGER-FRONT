import { taskApi } from "api";
import { getAllTasks, updateTask } from "api/task";
import { IComment } from "models/comment";
import { ITask } from "models/task";

const PREFIX = "/comment"

export const getCommentsById = async(taskId: number) => {
    const {data} = await taskApi.get(PREFIX + "/getAll");
    return data.filter((d: any) => d.reaTaskId === taskId);
}

export const postComment = async (comment: IComment, task: ITask) => {
    await taskApi.post(PREFIX + "/add", comment);
    const newComments = await getCommentsById(task.reaTaskId);
    return await updateTask({
        ...task,
        comments: newComments
    });
}