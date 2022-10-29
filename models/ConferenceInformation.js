const mongoose = require('mongoose');

const ConferenceInformationSchema = mongoose.Schema(
	{
		title: { type: String, required: true },
		shortDescription: { type: String, required: true },
		longDescription: { type: String, required: true },
		dates: [Date],
		startTime: Date,
	},
	{ collection: 'conferenceInformation' }
);

module.exports = mongoose.model(
	'ConferenceInformation',
	ConferenceInformationSchema
);
