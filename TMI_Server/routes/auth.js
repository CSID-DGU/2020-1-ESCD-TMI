const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Manager } = require("../models");

const router = express.Router();

router.get("/login", isNotLoggedIn, async (req, res) => {
  return res.render("login.html");
});

router.get("/join", isNotLoggedIn, async (req, res) => {
  return res.render("join.html");
});

// API 맞추기
router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { email, name, password } = req.body;

  try {
    const exManager = await Manager.findOne({ where: { email } });
    if (exManager) {
      // API 맞추기
      return res.render("join.html", {
        joinError: req.flash("이미 가입된 이메일입니다."),
      });
    }

    // 사용자 계정 보안
    const hash = await bcrypt.hash(password, 12);
    await Manager.create({
      name,
      email,
      password: hash,
    });
    // API 맞추기
    return res.redirect("/auth/login");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// API 맞추기
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, manager, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!manager) {
      // API 맞추기
      return res.render("login.html", {
        loginError: info.message,
      });
    }
    return req.login(manager, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      // API 맞추기
      return res.redirect(`/manager/${manager.id}`);
    });
  })(req, res, next);
});

// API 맞추기
router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  // API 맞추기s
  res.redirect("/");
});

module.exports = router;
