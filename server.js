const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');



dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'sc',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Định tuyến
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));