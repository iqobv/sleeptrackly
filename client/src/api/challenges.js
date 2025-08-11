export const getChallengesByUser = async () => {
	const response = await fetch(`/api/v1/challenges/me`, {
		credentials: 'include',
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData?.message || 'Failed to get challenges');
	}

	const data = await response.json();

	return data;
};

export const getChallengeById = async (id) => {
	const response = await fetch(`/api/v1/challenges/id/${id}`, {
		credentials: 'include',
	});

	if (!response.ok) {
		const errorData = await response.json();

		throw new Error(errorData?.message || 'Failed to fetch challenge');
	}

	const data = await response.json();

	return data;
};

export const createChallenge = async (data) => {
	const response = await fetch(`/api/v1/challenges`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData?.message || 'Failed to create challenge');
	}

	const challenge = await response.json();

	return challenge;
};

export const updateChallenge = async (challengeId, data) => {
	const response = await fetch(`/api/v1/challenges/${challengeId}`, {
		method: 'PATCH',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData?.message || 'Failed to update challenge');
	}

	const challenge = await response.json();

	return challenge;
};

export const updateTask = async (challengeId, taskId, data) => {
	const response = await fetch(
		`/api/v1/challenges/${challengeId}/task/${taskId}`,
		{
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		},
	);

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData?.message || 'Failed to update task');
	}

	const task = await response.json();

	return task;
};

export const deleteChallenge = async (challengeId) => {
	const response = await fetch(`/api/v1/challenges/${challengeId}`, {
		method: 'DELETE',
		credentials: 'include',
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData?.message || 'Failed to delete challenge');
	}

	const challenge = await response.json();

	return challenge;
};
