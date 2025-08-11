export const fetchAllVersions = async () => {
	const res = await fetch('/api/v1/changelog/all-versions');

	const data = await res.json();

	if (!res.ok) throw new Error(data.message || 'Failed to fetch all versions');

	return data;
};

export const fetchChangelogByVer = async (ver) => {
	const res = await fetch(`/api/v1/changelog/ver/${ver}`);

	const data = await res.json();

	if (!res.ok) throw new Error(data.message || 'Failed to fetch changelog');

	return data;
};

export const createChangelog = async (changelog) => {
	const res = await fetch('/api/v1/changelog', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(changelog),
	});

	const data = await res.json();

	if (!res.ok) throw new Error(data.message || 'Failed to create changelog');

	return data;
};

export const updateChangelog = async (id, changelog) => {
	const res = await fetch(`/api/v1/changelog/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(changelog),
	});

	const data = await res.json();

	if (!res.ok) throw new Error(data.message || 'Failed to update changelog');

	return data;
};

export const deleteChangelog = async (id) => {
	const res = await fetch(`/api/v1/changelog/${id}`, {
		method: 'DELETE',
		credentials: 'include',
	});

	const data = await res.json();

	if (!res.ok) throw new Error(data.message || 'Failed to delete changelog');

	return data;
};
