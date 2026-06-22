"use strict";

/**
 * Raw AI helper functions
 * Clean/revise/fix as needed
 */

// sorting.js

export function sortByWebsite(entries) {
    return [...entries].sort((a, b) =>
        a.website.localeCompare(b.website)
    );
}

export function sortByUsername(entries) {
    return [...entries].sort((a, b) =>
        a.username.localeCompare(b.username)
    );
}

export function sortByCategory(entries) {
    return [...entries].sort((a, b) =>
        a.category.localeCompare(b.category)
    );
}

export function sortByFamilyMember(entries) {
    return [...entries].sort((a, b) =>
        a.familyMember.localeCompare(
            b.familyMember
        )
    );
}