const mongoose = require('mongoose');

const ScheduleSchema = mongoose.Schema(
	{
		description: String,
		sessions: [
			{
				_id: Number,
				time: { type: String, required: true },
				description: { type: String, required: true },
				speakers: [String],
			},
		],
	},
	{ collection: 'schedules' }
);

module.exports = mongoose.model('Schedule', ScheduleSchema);
