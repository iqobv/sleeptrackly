'use client';

import { AUTH_PAGES } from '@/config/authPages.config';
import { MessageApiResponse } from '@/types/api/messageApiResponse.types';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

let isRefreshing = false;
let failedQueue: Array<{
	resolve: (value?: unknown) => void;
	reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: MessageApiResponse | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve();
		}
	});
	failedQueue = [];
};

apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError<MessageApiResponse>) => {
		const originalRequest = error.config as CustomAxiosRequestConfig;
		const requestUrl = originalRequest?.url || '';

		const isAuthEndpoint = Object.values(AUTH_PAGES).some((path) =>
			requestUrl.includes(path),
		);

		if (
			error.response?.status === 401 &&
			!isAuthEndpoint &&
			!originalRequest._retry
		) {
			if (isRefreshing) {
				return new Promise(function (resolve, reject) {
					failedQueue.push({ resolve, reject });
				})
					.then(() => {
						return apiClient(originalRequest);
					})
					.catch((err) => {
						return Promise.reject(err);
					});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`,
					{},
					{ withCredentials: true },
				);

				processQueue(null);
				return apiClient(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError as MessageApiResponse);

				if (typeof window !== 'undefined') {
					window.location.href = AUTH_PAGES.LOGIN;
				}

				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		if (error.response?.data?.message) {
			error.message = error.response.data.message;
			error.code = error.response.data.code;
		}

		return Promise.reject(error);
	},
);

export default apiClient;
