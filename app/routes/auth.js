const express = require("express");
const router = express.Router();
const connection = require("../lib/db");

router.get("/", (req, res, next) => {
  res.render("auth/login", {
    title: "Login",
    email: "",
    password: "",
  });
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", {
    title: "Login",
    email: "",
    password: "",
  });
});

router.post("/authentication", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  connection.query(
    `SELECT * FROM accounts WHERE email = ? AND password = ?`,
    [email, password],
    (err, row, fields) => {
      if (err) throw err;
      if (rows.length <= 0) {
        req.flash("error", "Please correct email and password");
        res.redirect("/login");
      } else {
        req.session.loggedin = true;
        req.session.name = name;
        res.redirect("/home");
      }
    }
  );
});

router.get("/register", (req, res, next) => {
  res.render("auth/register", {
    title: "Registration Page",
    name: "",
    email: "",
    password: "",
  });
});

router.post("/post-register", (req, res, next) => {
  res.assert("name", "Name is required").notEmpty();
  res.assert("password", "Password is required").notEmpty();
  res.assert("email", "A valid email is required").isEmail();

  const errors = req.validationErrors();
  if (!errors) {
    const user = {
      name: req.sanitize("name").escape().trim(),
      email: req.sanitize("email").escape().trim(),
      password: req.sanitize("password").escape().trim(),
    };
    connection.query(`INSERT INTO users SET ?`, user, (err, result) => {
      if (err) {
        req.flash("error", err);
        res.render("auth/register", {
          title: "Registration Page",
          name: "",
          password: "",
          email: "",
        });
      } else {
        req.flash("success", "You have successfully signed up!");
        res.redirect("/login");
      }
    });
  } else {
    const error_msg = "";
    errors.forEach((error) => (error_msg += error.msg + "<br>"));
    req.flash("error", error_msg);
    res.render("auth/register", {
      title: "Registration Page",
      name: req.body.name,
      email: req.body.email,
      password: "",
    });
  }
});

router.get("/home", (req, res, next) => {
  if (req.session.loggedin) {
    res.render("auth/home", {
      title: "Dashboard",
      name: req.session.name,
    });
  } else {
    req.flash("success", "Please log in first!");
    res.redirect("/login");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  req.flash("success", "Log In Again Here");
  res.redirect("/login");
});

module.exports = router;
