// inputs
import {IInput} from "components/Forms/BaseForm/types";

export const createTaskInputs: IInput[] = [
    {
        name: "title",
        required: true
    },
    {
        name: "description"
    }
]

export const viewTaskInputs: IInput[] = [
    {
        name: "title",
        required: true,
        readOnly: true
    },
    {
        name: "description",
        readOnly: true
    }
]

export const loginInputs: IInput[] = [
    {
        name: "username",
    },
    {
        name: "password",
        type: "password"
    }
]