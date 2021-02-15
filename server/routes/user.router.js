const express = require("express");
const pool = require("../modules/pool");
const encryptLib = require("../modules/encryption");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Send POST request to database to user add new account if the user registering successful
router.post("/register", (req, res, next) => {
  console.log("---->", req.body);
  const username = req.body.username.replace(/ /g, "").toLowerCase();
  const name = req.body.name;
  const password = encryptLib.encryptPassword(req.body.password);
console.log(username, name, password)
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
<h3>Hello ${req.body.username}!</h3>
<p>You just successfully create an account in Found It</p>
<p>Hope this app will be helpful for you</p>
<p>Enjoy it!</p>
`;
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "foundit010@gmail.com", // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    let mailOption = {
      from: '"FoundIt App"<foundit010@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "FoundIt confirmation", // Subject line
      // text: "Confirm that you want to create an account ?", // plain text body
      html: htmlEmail, // html body
    };
    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log("Message sent: : Email has been sent");
    });
  });

  //Go to database, add to username and password columns what user type in input (req.body)
  const queryText =
    'INSERT INTO "user" (email, password, name ) VALUES ($1, $2, $3) RETURNING id';
  pool
    .query(queryText, [username, password, name])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
  console.log(req.body)

});

router.post("/logout", (req, res) => {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
