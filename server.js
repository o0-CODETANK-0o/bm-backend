const express = require('express');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const hpp = require('hpp');

dotenv.config({ path: './config/config.env' });
// const connectDB = require('./config/db');
const connectDB = require('./config/db');
connectDB();

const app = express();

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.use(rateLimiter);
app.use(hpp());

// Define Routes
app.get('/contact', (req, res) => {
  res.send('5000 running');
});

app.use('/registeruser', require('./routes/registerUserRoute'));
app.use('/api/flats', require('./routes/api/flats'));

// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT || '5000', () =>
  console.log(`Server is running on port ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error ${err.message}`);
  server.close(() => process.exit(1));
});
