const passport = require('passport');
const kakao = require('./kakaoStrategy');
const google=require('./googleStrategy');
const naver=require('./naverStrategy');
const local=require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({
            where: { id },
            include: [{
                model: User,
                attributes: ['id', 'nick','profileImg'],
                as: 'Followers',
            }, {
                model: User,
                attributes: ['id', 'nick','profileImg'],
                as: 'Followings',
            }],
        })
            .then(user => done(null, user))
            .catch(err => done(err));
    });
    local();
    kakao();
    naver();
    google();
};