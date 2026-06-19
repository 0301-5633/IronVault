"use strict";

/**
 * Raw AI helper functions
 * Clean/revise/fix as needed
 */

// filtering.js

export function filterByCategory(
    entries,
    categoryId
) {
    return entries.filter(
        entry =>
            entry.category_id === categoryId
    );
}

export function filterByFamilyMember(
    entries,
    memberId
) {
    return entries.filter(
        entry =>
            entry.family_member_id === memberId
    );
}

export function filterFavorites(entries) {
    return entries.filter(
        entry => entry.is_favorite
    );
}