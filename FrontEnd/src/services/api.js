"use strict";

/**
 * Raw AI helper functions
 * Clean/revise/fix as needed
 */

// api.js



export async function apiRequest(
    endpoint,
    method,
    body
) {

    const response = await fetch(`${endpoint}`,
        {
            method,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            'body': body
        }
    );



    return response.json();
}