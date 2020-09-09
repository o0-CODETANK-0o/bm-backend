const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')

const app = express();

// Connect Database
connectDB();
app.get('/', (req, res) => res.send('API Running'));

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors())
// Define Routes
app.use('/api/flats', require('./routes/api/flats'));

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server is running on port ${ PORT }`));