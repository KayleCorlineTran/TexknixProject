const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User')
const bcrypt = require('bcryptjs');


passport.use(new LocalStrategy(
    { usernameField: 'email' }, // Sử dụng email làm username
    (email, password, done) => {
        UserModel.findOne({ email: email })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Tên đăng nhập không đúng.' });
                }

                // So sánh mật khẩu
                return bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            return done(null, false, { message: 'Mật khẩu không đúng.' });
                        }
                        return done(null, user);
                    });
            })
            .catch(err => {
                return done(err);
            });
    }
));
// Chuyển đổi người dùng thành phiên
passport.serializeUser((user, done) => {  // lưu id vào session
    done(null, user.id); 
});

// Chuyển đổi phiên thành người dùng
passport.deserializeUser((id, done) => {  // gọi lại hàm nhiều lần
    UserModel.findById(id)
        .then(user => {
            done(null, user);   
        })
        .catch(err => {
            done(err);
        });
})


module.exports = passport;