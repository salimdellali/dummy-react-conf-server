// import npm packages
const express = require('express');
const router = express.Router();

// Models
const ConferenceInformation = require('../../models/ConferenceInformation');
const Attendee = require('../../models/Attendee');
const Schedule = require('../../models/Schedule');
const Speaker = require('../../models/Speaker');

/**
 * @route GET api/overview
 * @desc Get all conference information & the statistics
 * @access Public
 */
router.get('/', (req, res) => {
	// Preparing the DB calls as promises
	const getConferenceInformation = () => {
		return ConferenceInformation.findOne().exec();
	};

	const getCountSpeakers = () => {
		return new Promise((resolve, reject) => {
			Speaker.countDocuments({}, (err, count) => {
				err ? reject(err) : resolve(count);
			});
		});
	};

	const getCountAttendees = () => {
		return new Promise((resolve, reject) => {
			Attendee.countDocuments({}, (err, count) => {
				err ? reject(err) : resolve(count);
			});
		});
	};

	const getCountSchedules = () => {
		return new Promise((resolve, reject) => {
			Schedule.find()
				.exec()
				.then((schedules) => {
					let count = 0;
					schedules.forEach((schedule) => {
						count += schedule.sessions.length;
					});
					resolve(count);
				});
		});
	};

	// parallel execution and proceeding to res.json() after all promises has been resolved
	Promise.all([
		getConferenceInformation(),
		getCountSpeakers(),
		getCountAttendees(),
		getCountSchedules(),
	]).then(
		([
			conferenceInformation,
			numberOfSpeakers,
			numberOfAttendees,
			numberOfSessions,
		]) => {
			res.json({
				conferenceInformation,
				numberOfSpeakers,
				numberOfAttendees,
				numberOfSessions,
			});
		}
	);
});

module.exports = router;
