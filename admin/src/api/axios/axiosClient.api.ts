'use client';

import { useUserStore } from '@/store';
import { Error } from '@/types';
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

const processQueue = (error: Error | null = null) => {
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
	async (error: AxiosError<Error>) => {
		const originalRequest = error.config as CustomAxiosRequestConfig;

		if (error.response?.status === 401 && !originalRequest._retry) {
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
				processQueue(refreshError as Error);

				useUserStore.getState().logout();
				if (typeof window !== 'undefined') {
					window.location.href =
						process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
				}
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		if (error.response?.data?.message) {
			error.message = error.response.data.message;
			// error.code = error.response.data.code;
		}

		return Promise.reject(error);
	},
);

export default apiClient;
