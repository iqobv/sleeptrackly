export interface IUser {
	id: string;
	email: string;
	username: string;
	role: 'USER' | 'ADMIN';
	createdAt: Date;
	avatar: {
		url: string;
		isDefault: boolean;
	};
}
