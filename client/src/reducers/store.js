import { configureStore } from '@reduxjs/toolkit';

import themeSlice from './slices/themeSlice.js';
import userSlice from './slices/userSlice.js';

const store = configureStore({
	reducer: {
		user: userSlice,
		theme: themeSlice,
	},
});

export default store;
