const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Book, List } = require("../models");

const router = express.Router();

router.get("/", isNotLoggedIn, async (req, res, next) => {
  try {
    const books = await Book.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (books) {
      return res.render("main", {
        books: books,
      });
    } else {
      return res.render("main", {
        noBooks: req.flash("아직 작성된 명부가 없습니다."),
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
