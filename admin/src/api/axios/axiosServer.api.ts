'use server';

import { MessageApiResponse } from '@/types';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const apiServer = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
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
	(error: AxiosError<MessageApiResponse>) => {
		if (error.response?.status === 401) {
			redirect(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
		}

		if (error.response?.data?.message) {
			error.message = error.response.data.message;
			error.code = error.response.data.code;
		}

		return Promise.reject(error);
	},
);

export default apiServer;
