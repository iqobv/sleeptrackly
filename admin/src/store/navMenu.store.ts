import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NavMenuState {
	isExpanded: boolean;
}

interface NavMenuActions {
	setIsExpanded: (isExpanded: boolean) => void;
}

export const useNavMenuStore = create<NavMenuState & NavMenuActions>()(
	persist(
		(set) => ({
			isExpanded: true,
			setIsExpanded: (isExpanded: boolean) => set(() => ({ isExpanded })),
		}),
		{
			name: 'nav-menu',
		}
	)
);
