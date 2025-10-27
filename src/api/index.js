import {getToken} from "../utils/tokens.js";

export const BASE_URL = 'http://localhost:8080/';

export const API_ENDPOINTS = {
    LOGIN: 'auth/sign-in',
    REGISTER: 'auth/sign-up',
    USER_PROFILE: 'user/me',
    CHANGE_USER_PROFILE: 'user/change-info',
    CHANGE_PASSWORD: 'user/change-password',
    GET_PAYMENT_METHODS: 'user/payments',
    ADD_PAYMENT_METHOD: 'user/add-payment',
    REMOVE_PAYMENT_METHOD: 'user/remove-payment',
    ADD_ADDRESS: 'user/add-address',
    REMOVE_ADDRESS: 'user/remove-address',
    GET_ADDRESSES: 'user/addresses',
    ADMIN_ADD_COMPONENTS: 'admin/add-component',
    ADMIN_EDIT_COMPONENTS: 'admin/update-component',
    ADMIN_REMOVE_COMPONENTS: 'admin/remove-component',
    ADMIN_GET_ALL_COMPONENTS: 'admin/components',
    ADMIN_GET_ALL_USERS: 'admin/users',
    ADMIN_GET_ALL_ORDERS: 'admin/orders',
    ADMIN_CHANGE_ORDER_STATUS: 'admin/change-order-status',
    COMPONENT_BY_CATEGORY: 'components/category',
    CREATE_ORDER: 'orders',
    GET_ALL_ORDERS: 'orders',
    GET_REVIEWS: 'reviews/all',
    CREATE_REVIEW: 'reviews/create',
}

class ApiError extends Error {
    status;
    fieldErrors;

    constructor(message, status, fieldErrors = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.fieldErrors = fieldErrors;
    }
}

export async function apiClient(url, options = {}, isAuthRequired = false) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...(isAuthRequired && {
                'Authorization': `Bearer ${getToken()}`,
            }
            ),
            ...options.headers,
        },
        ...options,
    };

    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(
            errorData.message || 'Произошла ошибка сервера',
            errorData.status || response.status,
            errorData.fieldErrors || null
        );
    }
    if (response.status === 204) {
        return Promise.resolve(null);
    }

    return response.json();
}