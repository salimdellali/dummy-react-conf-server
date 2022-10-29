const mongoose = require('mongoose');

const SpeakerSchema = mongoose.Schema(
	{
		gender: { type: String, enum: ['male', 'female', 'other'], required: true },
		name: {
			title: {
				type: String,
				enum: ['Mr', 'Ms', 'Mrs', 'Miss', 'Monsieur', 'Madame'],
				required: true,
			},
			first: { type: String, required: true },
			last: { type: String, required: true },
		},
		profession: { type: String, required: true },
		email: {
			type: String,
			trim: true,
			lowercase: true,
			unique: true,
			required: 'Email address is required',
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please fill a valid email address',
			],
		},
		phone: { type: String, required: true },
		cell: { type: String, required: true },
		picture: {
			large: { type: String, required: true },
			medium: { type: String, required: true },
			thumbnail: { type: String, required: true },
		},
		nat: { type: String, required: true },
	},
	{ collection: 'speakers' }
);

module.exports = mongoose.model('Speaker', SpeakerSchema);
