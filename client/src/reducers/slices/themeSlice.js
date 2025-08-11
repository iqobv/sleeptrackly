import { createSlice } from '@reduxjs/toolkit';

const initialTheme = localStorage.getItem('theme') || 'light';

const themeSlice = createSlice({
	name: 'theme',
	initialState: {
		theme: initialTheme,
	},
	reducers: {
		toggleTheme: (state) => {
			state.theme = state.theme === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme', state.theme);
			document.body.classList.toggle('dark', state.theme === 'dark');
		},
	},
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
