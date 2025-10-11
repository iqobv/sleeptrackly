import { create } from 'zustand';

interface WeekState {
	currentWeek: number;
}

interface WeekActions {
	setCurrentWeek: (week: number) => void;
}

export const useWeekStore = create<WeekState & WeekActions>((set) => ({
	currentWeek: 0,
	setCurrentWeek: (week: number) => set(() => ({ currentWeek: week })),
}));
