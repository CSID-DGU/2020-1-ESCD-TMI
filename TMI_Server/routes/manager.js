const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Manager, Book, List } = require("../models");

const router = express.Router();

router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const books = await Book.findAll({
      where: {
        writer: req.params.id,
      },
      order: [["createdAt", "DESC"]],
    });

    // 보안 설정
    if (req.manager.id != req.params.id) {
      return res.render("manager", {
        authError: req.flash("잘못된 접근입니다."),
      });
    }

    if (books) {
      return res.render("manager", {
        books: books,
      });
    } else {
      return res.render("manager", {
        noBooks: req.flash("작성된 명부가 없습니다."),
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/add", isLoggedIn, async (req, res, next) => {
  return res.render("addBook");
});

router.post("/add", isLoggedIn, async (req, res, next) => {
  try {
    const { name, bankNum } = req.body;
    await Book.create({
      name,
      bankNum,
      writer: req.manager.id,
    });
    // 내역 가져오기

    return res.redirect(`/manager/${req.manager.id}`);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/edit/:id", isLoggedIn, async (req, res) => {
  return res.render("edit");
});
