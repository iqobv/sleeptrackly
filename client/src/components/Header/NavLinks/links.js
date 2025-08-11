const Link = (name, label, path, isAdmin = false) => ({
	name,
	label,
	path,
	isAdmin,
});

export const links = [
	Link('home', 'Home', '/'),
	Link('timer', 'Timer', '/timer'),
	Link('challenges', 'Challenges', '/challenges', true),
	Link('dashboard', 'Dashboard', '/dashboard'),
	Link('changelog', 'Changelog', '/changelogs', true),
];
