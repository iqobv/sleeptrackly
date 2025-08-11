export const errorHandler = (err, req, res, next) => {
	if (err.code === 11000) {
		console.log(err);
		const duplicatedField = Object.keys(err.keyPattern)[0];
		return res.status(400).json({
			message: `${duplicatedField} already exists.`,
			field: duplicatedField,
			type: 'DuplicateKeyError',
		});
	}

	if (err.name === 'ValidationError') {
		const errors = Object.values(err.errors).map((e) => ({
			field: e.path,
			message: e.message,
		}));

		return res.status(400).json({
			message: 'Validation error',
			errors,
			type: 'ValidationError',
		});
	}

	const statusCode = err.statusCode || 500;
	return res
		.status(statusCode)
		.json({ message: err.message || 'Something went wrong' });
};
