const express = require("express");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Manager, Book, List } = require("../models");
const list = require("../models/list");

const router = express.Router();

router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const books = await Book.findAll({
      where: {
        writer: req.params.id,
      },
      order: [["createdAt", "ASC"]],
    });

    // 보안 설정
    if (req.user.id != req.params.id) {
      // return res.render("manager", {
      //   authError: req.flash("잘못된 접근입니다."),
      // });
      return res.send("잘못된 요청, 홈 화면 필요");
    }

    if (books) {
      return res.render("mypage.html", {
        books: books,
        user: req.user,
      });
      // return res.send("명부 출력 페이지 필요");
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
  if (req.user.id != req.params.id) {
    return res.send("잘못된 접근");
  }
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

// 장부 클릭하면 세부내역 렌더링
router.get("/:id/check/:bookId", isLoggedIn, async (req, res, next) => {
  try {
    const books = await Book.findAll({
      where: {
        writer: req.params.id,
      },
      order: [["createdAt", "ASC"]],
    });

    const list = await List.findAll({
      where: {
        ofWhom: books[Number(req.params.bookId) - 1].id,
      },
      order: [["createdAt", "ASC"]],
    });

    // if (req.user.id != req.params.id) {
    //   return res.send("잘못된 접근");
    // }

    return res.render("list.html", {
      list: list,
      address: `/manager/${req.user.id}/check/${req.params.bookId}/edit`,
      address2: `/manager/${req.user.id}`,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/:id/check/:bookId/edit", isLoggedIn, async (req, res, next) => {
  return res.render("addList.html", {
    address: `/manager/${req.user.id}/edit/${req.params.bookId}`,
  });
})

// 보류
router.post("/:id/edit/:bookId", isLoggedIn, async (req, res, next) => {
  if (req.user.id != req.params.id) {
    return res.send("잘못된 접근");
  }

  const books = await Book.findAll({
    where: {
      writer: req.params.id,
    },
    order: [["createdAt", "ASC"]],
  });

  try {
    await List.create({
      date: "2020-01-01",
      time: "24:00",
      inOrOut: "입금",
      transactionType: "카드",
      bankContent: "",
      UserContent: req.body.userContent,
      money: req.body.price,
      balance: "10000",
      where: "카페",
      ofWhom: books[Number(req.params.bookId) - 1].id,
    });

    return res.redirect(`/manager/${req.user.id}/check/${req.params.bookId}`)
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
module.exports = router;
