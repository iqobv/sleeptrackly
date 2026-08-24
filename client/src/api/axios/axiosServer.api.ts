'use server';

import { AUTH_PAGES } from '@/config/authPages.config';
import { CROSS_DOMAIN_ROUTES } from '@/config/navigation.config';
import { env } from '@/env';
import { MessageApiResponse } from '@/types/api/messageApiResponse.types';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

const url = env.NEXT_PUBLIC_API_URL;

const apiServer = axios.create({
	baseURL: url,
	withCredentials: true,
});

apiServer.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		const cookieStore = await cookies();
		const cookieHeader = cookieStore.toString();

		if (cookieHeader) {
			config.headers.set('Cookie', cookieHeader);
		}

		return config;
	},
	(error: AxiosError<MessageApiResponse>) => {
		return Promise.reject(error);
	},
);

apiServer.interceptors.response.use(
	(response) => response,
	async (error: AxiosError<MessageApiResponse>) => {
		const requestUrl = error.config?.url || '';

		const isAuthEndpoint = Object.values(AUTH_PAGES).some((path) =>
			requestUrl.includes(path),
		);

		if (error.response?.status === 401 && !isAuthEndpoint) {
			let callbackUrl = '';

			try {
				const headersList = await headers();
				const currentPath = headersList.get('x-current-path');

				if (currentPath) {
					callbackUrl = `?callbackUrl=${encodeURIComponent(currentPath)}`;
				}
			} catch (error) {
				void error;
			}

			redirect(`${CROSS_DOMAIN_ROUTES.APP_LOGIN}${callbackUrl}`);
		}

		if (error.response?.data?.message) {
			error.message = error.response.data.message;
			error.code = error.response.data.code;
		}

		return Promise.reject(error);
	},
);

export default apiServer;
