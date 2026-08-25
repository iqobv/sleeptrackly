'use server';

import { env } from '@/env';
import { MessageApiResponse } from '@/types/api/messageApiResponse.types';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';

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
		if (error.response?.data?.message) {
			error.message = error.response.data.message;
			error.code = error.response.data.code;
		}

		return Promise.reject(error);
	},
);

export default apiServer;
