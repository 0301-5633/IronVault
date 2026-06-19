"use strict";

/**
 * Raw AI helper functions
 * Clean/revise/fix as needed
 */

// api.js

const API_BASE_URL = "http://localhost:8000/api";

export async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem("authToken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            ...(token && {
                Authorization: `Bearer ${token}`
            })
        },
        ...options
    };

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        config
    );

    if (!response.ok) {
        let errorMessage = `API Error: ${response.status}`;

        try {
            const errorData = await response.json();
            errorMessage = errorData.detail || errorMessage;
        } catch {
            // Ignore JSON parse errors
        }

        throw new Error(errorMessage);
    }

    return await response.json();
}