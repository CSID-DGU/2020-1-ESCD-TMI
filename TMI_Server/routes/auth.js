const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Manager } = require("../models");

const router = express.Router();

// API 맞추기
router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { email, name, password } = req.body;

  try {
    const exManager = await Manager.findOne({ where: { email } });
    if (exManager) {
      // 나중에 사용하기
      req.flash("joinError", "이미 가입된 이메일입니다.");
      // API 맞추기
      return res.redirect("/join");
    }

    // 사용자 계정 보안
    const hash = await bcrypt.hash(password, 12);
    await Manager.create({
      name,
      email,
      password: hash,
    });
    // API 맞추기
    return res.redirect("/");
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
      // 나중에 사용하기
      req.flash("loginError", info.message);
      // API 맞추기
      return res.redirect("/");
    }
    return req.login(manager, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      // API 맞추기
      return res.redirect("/");
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
