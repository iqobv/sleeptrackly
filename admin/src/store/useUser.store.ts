import { User } from '@/types/user/user.types';
import { create } from 'zustand';

interface UserState {
	user: User | null;
}

interface UserActions {
	setUser: (user: User | null) => void;
	logout: () => void;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
	user: null,
	setUser: (user) => set(() => ({ user })),
	logout: () => set(() => ({ user: null })),
}));
