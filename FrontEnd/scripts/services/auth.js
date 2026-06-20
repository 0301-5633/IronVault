"use strict";

/**
 * Raw AI helper functions
 * Clean/revise/fix as needed
 */

// auth.js

import { apiRequest } from "./api.js";

export async function login(username, password) {
    const result = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
            username,
            password
        })
    });

    localStorage.setItem(
        "authToken",
        result.access_token
    );

    return result;
}

export function logout() {
    localStorage.removeItem("authToken");
}

export function getToken() {
    return localStorage.getItem("authToken");
}

export function isLoggedIn() {
    return !!getToken();
}