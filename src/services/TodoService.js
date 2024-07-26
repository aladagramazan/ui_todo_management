import axios from "axios";
import {getToken} from "./AuthService";

const TODO_API_BASE_URL = "http://localhost:8071/api/v1/todos";

axios.interceptors.request.use(function (config) {
    config.headers["Authorization"] = getToken();
    return config;
}, function (error) {
    return Promise.reject(error);
});

export const listTodos = async () => {
    return await axios.get(TODO_API_BASE_URL);
}

export const createTodo = async (todo) => {
    return await axios.post(TODO_API_BASE_URL, todo);
}

export const getTodoById = async (todoId) => {
    return await axios.get(TODO_API_BASE_URL + '/' + todoId);
}

export const updateTodo = async (todo, todoId) => {
    return await axios.put(TODO_API_BASE_URL + '/' + todoId, todo);
}

export const deleteTodo = async (todoId) => {
    return await axios.delete(TODO_API_BASE_URL + '/' + todoId);
}
export const completeTodo = async (todoId) => {
    return await axios.patch(TODO_API_BASE_URL + '/' + todoId + '/complete');
}

export const inCompleteTodo = async (todoId) => {
    return await axios.patch(TODO_API_BASE_URL + '/' + todoId + '/in-complete');
}