const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { Manager } = require("../models");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        // req.body 속성명
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const exManager = await Manager.findOne({ where: { email } });
          if (exManager) {
            const result = await bcrypt.compare(password, exManager.password);
            if (result) {
              done(null, exManager);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
