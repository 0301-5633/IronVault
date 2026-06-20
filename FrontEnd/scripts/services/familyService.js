"use strict";

/**
 * Raw AI helper functions
 * Clean/revise/fix as needed
 */

// familyService.js

import { apiRequest } from "./api.js";

export async function getFamilyMembers() {
    return await apiRequest("/family-members");
}

export async function getFamilyMemberById(id) {
    return await apiRequest(
        `/family-members/${id}`
    );
}

export async function createFamilyMember(name) {
    return await apiRequest("/family-members", {
        method: "POST",
        body: JSON.stringify({
            name
        })
    });
}

export async function updateFamilyMember(id, name) {
    return await apiRequest(
        `/family-members/${id}`,
        {
            method: "PUT",
            body: JSON.stringify({
                name
            })
        }
    );
}

export async function deleteFamilyMember(id) {
    return await apiRequest(
        `/family-members/${id}`,
        {
            method: "DELETE"
        }
    );
}