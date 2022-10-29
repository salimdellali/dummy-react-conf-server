const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		register_date: {
			type: Date,
			default: Date.now,
		},
	},
	{ collection: 'users' }
);

module.exports = mongoose.model('User', UserSchema);
