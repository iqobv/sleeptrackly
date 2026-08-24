'use client';

import { AUTH_PAGES } from '@/config/authPages.config';
import { CROSS_DOMAIN_ROUTES } from '@/config/navigation.config';
import { SUBDOMAINS } from '@/config/subdomains.config';
import { env } from '@/env';
import { MessageApiResponse } from '@/types/api/messageApiResponse.types';
import axios, {
	AxiosError,
	InternalAxiosRequestConfig,
	isAxiosError,
} from 'axios';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

const url = env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
	baseURL: url,
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
					`${url}/v1/auth/refresh`,
					{},
					{ withCredentials: true },
				);

				processQueue(null);
				return apiClient(originalRequest);
			} catch (refreshError) {
				if (isAxiosError(refreshError)) {
					processQueue(refreshError.response?.data);
				}

				if (typeof window !== 'undefined') {
					const currentHost = window.location.hostname;
					const currentPath = window.location.pathname;
					const currentSearch = window.location.search;

					const isAppSubdomain = currentHost.startsWith(`${SUBDOMAINS.APP}.`);

					const isCurrentPageAuth = Object.values(AUTH_PAGES).some((path) =>
						currentPath.startsWith(path),
					);

					if (isAppSubdomain && !isCurrentPageAuth) {
						const loginUrl = new URL(
							CROSS_DOMAIN_ROUTES.APP_LOGIN,
							window.location.origin,
						);

						loginUrl.searchParams.set(
							'callbackUrl',
							currentPath + currentSearch,
						);

						window.location.href = loginUrl.toString();
					}
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
