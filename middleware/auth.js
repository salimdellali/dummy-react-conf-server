const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	const token = req.header('x-auth-token');

	// Check for token
	if (!token) {
		// 401 status code means Unothorized
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.jwtSecret);

		// Add user from payload
		req.user = decoded;

		next();
	} catch (e) {
		res.status(400).json({ msg: 'Token not valid' });
	}
};

module.exports = auth;
