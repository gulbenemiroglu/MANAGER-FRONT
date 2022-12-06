import {usersApi} from "api/index";

export const getAllUsers = async () => {
    const { data } = await usersApi.get("/users");
    return data;
}