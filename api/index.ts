import axios from "axios";
const https = require('https');


export const taskApi = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
    baseURL: "https://localhost:44325/api"
});

export const usersApi = axios.create({
   baseURL: "https://63877911d9b24b1be3f19326.mockapi.io/rea-task-final"
});

