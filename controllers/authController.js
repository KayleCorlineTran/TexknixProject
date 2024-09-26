const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('../config/passport');

exports.register = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const user = new UserModel({ email, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
};

exports.login = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: info.message });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRECT, { expiresIn: '600s' });
        res.json({ message: 'Đăng nhập thành công', token, role: user.role });
    })(req, res, next);
};