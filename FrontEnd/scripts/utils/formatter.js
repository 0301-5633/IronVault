"use strict";

/**
 * Raw AI helper functions
 * Clean/revise/fix as needed
 */

// formatters.js

export function formatPasswordEntry(
    password
) {
    return {
        id: password.id,
        website: password.website,
        username: password.username,
        password: password.password,
        category: password.category_name,
        familyMember:
            password.family_member_name
    };
}

export function formatPasswordList(
    passwords
) {
    return passwords.map(
        formatPasswordEntry
    );
}