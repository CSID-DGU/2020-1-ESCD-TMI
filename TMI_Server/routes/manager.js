const express = require("express");
const bcrypt = require("bcrypt");
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
    if (req.user.id != req.params.id) {
      // return res.render("manager", {
      //   authError: req.flash("잘못된 접근입니다."),
      // });
      return res.send("잘못된 요청, 홈 화면 필요");
    }

    if (books) {
      // return res.render("manager", {
      //   books: books,
      // });
      return res.send("명부 출력 페이지 필요");
    } else {
      // return res.render("manager", {
      //   noBooks: req.flash("작성된 명부가 없습니다."),
      // });
      return res.send("작성된 명부 없음, 빈 페이지 필요");
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/:id/add", isLoggedIn, async (req, res, next) => {
  return res.render("addBook.html");
});

router.post("/add", isLoggedIn, async (req, res, next) => {
  try {
    const { account_name, account, account_password } = req.body;

    const hash = await bcrypt.hash(account_password, 12);
    await Book.create({
      name: account_name,
      finTechNum: account,
      password: hash,
      writer: req.user.id,
    });
    // 내역 가져오기
    // 암호화 해서 저장하기

    return res.redirect(`/manager/${req.user.id}`);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 보류
router.get("/edit/:id", isLoggedIn, async (req, res) => {
  return res.render("edit");
});
module.exports = router;
