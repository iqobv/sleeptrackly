import { IUser } from '@/types';
import { create } from 'zustand';

interface UserState {
	user: IUser | null;
}

interface UserActions {
	setUser: (user: IUser | null) => void;
	logout: () => void;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
	user: null,
	setUser: (user) => set(() => ({ user })),
	logout: () => set(() => ({ user: null })),
}));
