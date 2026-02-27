// lib/axios.ts
import axios from 'axios';
import { getSession } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        // Extract token properly
        let token = null;

        if (session?.accessToken) {
            try {
                // Check if accessToken is a stringified object
                if (typeof session.accessToken === 'string' && session.accessToken.startsWith('{')) {
                    // Parse the stringified object
                    const parsedToken = JSON.parse(session.accessToken);
                    token = parsedToken.accessToken;
                } else {
                    // If it's already the token string
                    token = session.accessToken;
                }
            } catch (error) {
                console.error('Error parsing token:', error);
                // Fallback to using the raw value
                token = session.accessToken;
            }
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);