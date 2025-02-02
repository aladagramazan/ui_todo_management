import axios from "axios";

const AUTH_API_BASE_URL = "http://localhost:8071/api/auth";

export const registerAPICall = async (user) => {
    return await axios.post(AUTH_API_BASE_URL + '/register', user);
}

export const loginAPICall = async (usernameOrEmail, password) => {
    return await axios.post(AUTH_API_BASE_URL + '/login', {usernameOrEmail, password});
}

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (username, role) => {
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", role);
}
export const isUserLoggedIn = () => {
    const username = sessionStorage.getItem("authenticatedUser");

    if (username == null) {
        return false;
    } else {
        return true;
    }
}
export const getLoggedInUser = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    return username;
}

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}

export const isAdminUser = () => {
    let role = sessionStorage.getItem("role");
    if (role !== null && role === "ROLE_ADMIN") {
        return true;
    } else {
        return false;
    }
}