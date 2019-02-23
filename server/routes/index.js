// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

/* GET - display the Login Page */
router.get('/login', (req, res, next) => {
  if(!req.user){
    res.render('auth/login', {
      title: 'Login',
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : '',
      username: req.user ? req.user.username : ""
    });
  }else{
    return res.redirect('/');
  }

});

/* POST - processes the Login Page */
router.post('/login',(req, res, next) => {
  passport.authenticate('local',
  (err, user, info) =>{
      //server error?
      if(err){
          return next(err);
      }
      //is there a user login error?
      if(!user){
          req.flash("loginMessage", "Authentication Error");
          return res.redirect('/login');
      }
      req.logIn(user, (err) => {
          //server error?
          if(err){
              return next(err);
          }
          return res.redirect('/contact-list');
      });
  })(req, res, next);
});

/* GET - display the User Registration Page */
router.get('/register', (req, res, next) => {
  res.render('auth/register', {
    title: 'Register',
   });
});

// /* POST - processes the User Registration Page */
// router.post('/register', (req, res, next) => {
//   res.render('content/index', {
//     title: 'Home',
//     books: ''
//    });
// });

// /* GET - perform user logout */
// router.get('/logout', (req, res, next) => {
//   res.render('content/index', {
//     title: 'Home',
//     books: ''
//    });
// });

module.exports = router;
