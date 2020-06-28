const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Book, List } = require("../models");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/:id/:pwd", async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.params.pwd, 12);
    const book = await Book.findOne({
      where: {
        id: req.params.id,
        password: hash,
      }
    });

    if (book) {
      const list = await List.findAll({
        where: {
          ofWhom: req.params.id,
        },
        order: [["createdAt", "DESC"]],
      });

      if (list) {
        return res.render("list.html", {
          list: list,
        });
      } else {
        return res.render("list.html", {
          noLists: req.flash("아직 작성된 세부내역이 없습니다."),
        });
      }
    } else {
      return res.render('/');
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
module.exports = router;
