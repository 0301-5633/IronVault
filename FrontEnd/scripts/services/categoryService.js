"use strict";

/**
 * Raw AI helper functions
 * Clean/revise/fix as needed
 */

// categoryService.js

import { apiRequest } from "./api.js";

export async function getCategories() {
    return await apiRequest("/categories");
}

export async function getCategoryById(id) {
    return await apiRequest(`/categories/${id}`);
}

export async function createCategory(name) {
    return await apiRequest("/categories", {
        method: "POST",
        body: JSON.stringify({
            name
        })
    });
}

export async function updateCategory(id, name) {
    return await apiRequest(`/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            name
        })
    });
}

export async function deleteCategory(id) {
    return await apiRequest(`/categories/${id}`, {
        method: "DELETE"
    });
}