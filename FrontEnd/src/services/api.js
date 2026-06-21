"use strict";

/**
 * Raw AI helper functions
 * Clean/revise/fix as needed
 */

// api.js



export async function apiRequest(
    endpoint,
    options = {}
) {

    const response = await fetch(
        `${endpoint}`,
        {
            credentials: "include",
            ...options
        }
    );

    return response.json();
}