// import npm packages
const express = require('express');
const router = express.Router();

// Speaker Model
const Speaker = require('../../models/Speaker');

// Get all speakers
router.get('/', (req, res) => {
	console.log('Getting all speakers ...');
	Speaker.find({})
		.exec()
		.then((speakers) => {
			console.log(speakers);
			res.json(speakers);
		})
		.catch((err) => {
			res.json({ message: 'error has occured : ' + err });
		});
});

module.exports = router;
