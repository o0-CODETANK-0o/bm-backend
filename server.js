const express = require('express');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const hpp = require('hpp');


// const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

// connectDB();

const app = express();

app.use(express.json());

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
});

app.use(cors());

app.use(rateLimiter);
app.use(hpp());

app.get("/contact", (req,res)=>{
  res.send("5000 running")
})


app.use('/contact', require('./routes/contactRoutes'));

const server = app.listen(process.env.PORT || '5000', () => console.log('hello'));

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error ${err.message}`);
  server.close(() => process.exit(1));
});
