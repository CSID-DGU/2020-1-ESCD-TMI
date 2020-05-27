const local = require("./localStrategy");
const { Manager } = require("../models");

module.exports = (passport) => {
  passport.serializeUser((manager, done) => {
    done(null, manager.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let manager = await Manager.findOne({ where: { id } });
      // 접속한 manager를 req.manager로 접근 가능
      manage = await done(null, manager);
    } catch (err) {
      done(err);
    }
  });

  local(passport);
};
