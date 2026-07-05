"use strict";

/**
 * Raw AI helper functions
 * Clean/revise/fix as needed
 */

// search.js

export function searchPasswords(
    entries,
    searchText
) {
    const term = searchText
        .trim()
        .toLowerCase();

    if (!term) {
        return entries;
    }

    return entries.filter(entry =>
        entry.website
            .toLowerCase()
            .includes(term) ||
        entry.username
            .toLowerCase()
            .includes(term)
    );
}