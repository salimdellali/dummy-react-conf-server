// import npm packages
const express = require('express');
const cors = require('cors');
require('dotenv/config');
require('./database');

// Init app
const app = express();

// to allow the API to be fetched from anywhere
app.use(cors());

// to be able to parse json data and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routes and use routes as middlewares
app.use('/api/overview', require('./routes/api/overview'));
app.use('/api/speakers', require('./routes/api/speakers'));
app.use('/api/schedules', require('./routes/api/schedules'));
app.use('/api/attendees', require('./routes/api/attendees'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// health check path
app.get('/api/ping', (req, res) => {
	res.send('pong!');
});

// set PORT to listen to
const PORT = process.env.PORT || 1234;
app.listen(PORT, (err) => {
	if (err) console.error(err);
	console.log(`Server started on port ${PORT} ...`);
});
