/**
 * @description : exports authentication strategy for github using passport.js
 * @params {Object} passport : passport object for authentication
 * @return {callback} : returns callback to be used in middleware
 */

const GithubStrategy = require('passport-github2').Strategy;
const User = require('../model/user'); 
const dbService = require('../utils/dbService');
const { USER_TYPES } = require('../constants/authConstant');

const githubPassportStrategy = passport => {
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_CLIENTSECRET,
    callbackURL: process.env.GITHUB_CALLBACKURL,
    scope: ['public_profile', 'email']
  }, async function (accessToken, refreshToken, profile, done) {
    if (profile){
      let userObj = {
        'username':profile.username,
        'ssoAuth': { 'githubId': profile.id },
        'email': profile.emails !== undefined ? profile.emails[0].value : '',
        'password':'',
        'userType':USER_TYPES.User
      };
      let found = await dbService.findOne(User,{ 'email':userObj.email });
      if (found){
        const id = found.id;
        await dbService.updateOne(User,{ _id :id },userObj);
      }
      else {
        await dbService.create(User,userObj);
      }
      let user = await dbService.findOne(User,{ 'ssoAuth.githubId':profile.id });
      return done(null, user);
    }
    return done(null,null);
  }
  ));
};

module.exports = { githubPassportStrategy };