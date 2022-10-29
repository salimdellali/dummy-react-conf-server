// import npm packages
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// User Model
const Attendee = require('../../models/Attendee');

/**
 * @route	GET api/attendees
 * @desc	Get all attendees
 * @access	Public
 */
router.get('/', (req, res) => {
	Attendee.find()
		.exec()
		.then((attendees) => {
			res.json(attendees);
		})
		.catch((err) => {
			res.json({ message: 'error has occured : ' + err });
		});
});

/**
 * @route POST api/attendees
 * @desc Add new attendee
 * @desc Public
 */
router.post('/', (req, res) => {
	Attendee.exists({ email: req.body.email })
		.then((found) => {
			if (found) {
				// email already exists, deny
				res.status(400).send('Email already in use');
			} else {
				// email doesn't exist, allow
				const newAttendee = new Attendee(JSON.parse(JSON.stringify(req.body)));
				newAttendee.save().then((attendee) => res.json(attendee));
			}
		})
		.catch((err) => {
			// Server Error
			res.status(500).send('Something went wrong!');
		});
});

/**
 * @route PUT api/attendees
 * @desc Update attendee
 * @desc PRIVATE
 */
router.put('/', auth, (req, res) => {
	Attendee.exists({
		$and: [{ _id: { $ne: req.body._id } }, { email: req.body.email }],
	})
		.then((found) => {
			if (found) {
				// email already exists, deny
				res.status(400).send('Email already in use');
			} else {
				// email doesn't exist, allow
				Attendee.findOneAndUpdate({ _id: req.body._id }, req.body)
					.exec()
					.then((attendee) => {
						res.json(attendee);
					});
			}
		})
		.catch((err) => {
			// Server Error
			res.status(500).send('Something went wrong!');
		});
});

/**
 * @route DELETE api/attendees
 * @desc Delete attendee
 * @desc PRIVATE
 */
router.delete('/:id', auth, (req, res) => {
	Attendee.findById(req.params.id)
		.then((attendee) =>
			// attendee.remove().then(() => res.json({ success: true }))
			attendee.remove().then((attendee) => res.json(attendee))
		)
		.catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
