// import npm packages
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

/**
 * @route	POST api/users/
 * @desc	Register new user
 * @access	Public
 */
router.post('/', (req, res) => {
	const { name, email, password } = req.body;

	// Simple validation
	if (!name || !email || !password) {
		return res.status(400).json({ msg: 'Please enter all fields' });
	}

	// Check for existing user
	User.findOne({ email: email }).then((user) => {
		if (user) return res.status(400).json({ msg: 'User already exists' });

		const newUser = new User({
			name,
			email,
			password,
		});

		// Creater salt & hash
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then((user) => {
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
	});
});

module.exports = router;
