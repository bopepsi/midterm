/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { insertUser } = require('../helper/queries');
const { signupCheck, loginCheck } = require('../helper/user')

router.get('/login', (req, res) => {
  res.render('login');
})

router.post('/login', async (req, res) => {
  let { email, password } = req.body;
  let msg;
  try {
    msg = await loginCheck(email, password);
    if (msg) {
      return res.render('login', { warning: msg, email: email });
    }
  } catch (error) {
    throw "login post:" + error['message'];
  }
  req.session.email = email;
  return res.redirect('/home');
})

router.get('/signup', (req, res) => {
  res.render('signup');
})

router.post('/signup', async (req, res) => {
  const { organization, username, email, password, confirm_password } = req.body;
  let permissionType = req.body.permission_type ? 'admin' : 'user';
  //* Validate user's inputs.
  try {
    let msg = await signupCheck(email, password, confirm_password, organization, permissionType);
    if (msg) {
      return res.render('signup', { warning: msg, organization: organization, email: email, username: username });
    }
  } catch (error) {
    throw "signup post:" + error['message'];
  }

  //* Hash user password then store it.
  let hashehPassword = await bcrypt.hash(password, 12);
  req.session.email = email;
  try {
    await insertUser(username, organization, email, hashehPassword, permissionType);
    //!
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    //   const msg = {
    //      to: email,
    //      from: email,
    //      templateId: "d-e9c8e759c12249028517d24ecaaa806a",
    //      dynamic_template_data: {
    //       name: username
    //      }
    //   };
    //   sgMail.send(msg, (error, result) => {
    //      if (error) {
    //          console.log(error);
    //      } else {
    //       console.log('Email sent')
    //     }
    //   });
    //!
    return res.redirect('/home');
  } catch (error) {
    throw error['message'];
  }
})

//* Don't delete this get logout
router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/')
})

router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/')
})

module.exports = router;
