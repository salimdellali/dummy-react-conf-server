// import npm packages
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

/**
 * @route	POST api/auth/
 * @desc	Authenticate user
 * @access	Public
 */
router.post('/', (req, res) => {
	const { email, password } = req.body;

	// Simple validation
	if (!email || !password) {
		// return res.status(400).json({ msg: 'Pleae enter all fields' });
		return res.status(400).send('Pleae enter all fields');
	}

	// Check for existing user
	User.findOne({ email: email }).then((user) => {
		// if (!user) return res.status(400).json({ msg: 'User does not exist' });
		if (!user) return res.status(400).send('Email provided does not exist');

		// Validate password
		bcrypt.compare(password, user.password).then((isMatch) => {
			// if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
			if (!isMatch) return res.status(400).send('Invalid credentials');

			jwt.sign(
				{ id: user.id }, // the payload, first parameter of sign() method, can be anything
				process.env.jwtSecret, // the secret, second parameter
				{ expiresIn: 3600 }, // Optional, expires ( here 3600 = 1 hours), 3rd argument
				(err, token) => {
					// cuz it's asynchronous, callback fn
					if (err) throw err;
					res.json({
						// token: token, // same as below
						token,
						user: {
							id: user.id,
							name: user.name,
							email: user.email,
						},
					});
				}
			);
		});
	});
});

/**
 * @route	GET api/auth/user
 * @desc	Get user data
 * @access	PRIVATE
 */
router.get('/user', auth, (req, res) => {
	User.findById(req.user.id)
		.select('-password')
		.then((user) => res.json(user));
});

module.exports = router;
