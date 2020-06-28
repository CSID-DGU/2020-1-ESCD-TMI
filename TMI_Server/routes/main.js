const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Book, List } = require("../models");

const router = express.Router();

router.get("/", isNotLoggedIn, async (req, res, next) => {
  return res.render("home.html", {
    user: req.user,
  });
});

// 검색

router.post("/search", isNotLoggedIn, async (req, res, next) => {
  try {
    const bookName = req.body.name;

    const book = await Book.findOne({
      where: {
        name: bookName,
      }
    });

    if (!book) {
      return res.render("notSearch.html");
    }

    const list = await List.findAll({
      where: {
        ofWhom: book.id,
      },
      order: [["createdAt", "ASC"]],
    });

    return res.render("list2.html", {
      list: list,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
