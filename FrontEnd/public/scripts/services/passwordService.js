"use strict";

/**
 * Raw AI helper functions
 * Clean/revise/fix as needed
 */

// passwordService.js

import { apiRequest } from "./api.js";

export async function getPasswords() {
    return await apiRequest("/passwords");
}

export async function getPasswordById(id) {
    return await apiRequest(`/passwords/${id}`);
}

export async function createPassword(passwordEntry) {
    return await apiRequest("/passwords", {
        method: "POST",
        body: JSON.stringify(passwordEntry)
    });
}

export async function updatePassword(id, passwordEntry) {
    return await apiRequest(`/passwords/${id}`, {
        method: "PUT",
        body: JSON.stringify(passwordEntry)
    });
}

export async function deletePassword(id) {
    return await apiRequest(`/passwords/${id}`, {
        method: "DELETE"
    });
}

export async function decryptPassword(passwordId) {
    return await apiRequest(
        `/passwords/${passwordId}/decrypt`
    );
}