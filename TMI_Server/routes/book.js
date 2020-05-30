const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Book, List } = require("../models");

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const lists = await List.findAll({
      where: {
        ofWhom: req.params.id,
      },
      order: [["createdAt", "DESC"]],
    });

    if (lists) {
      return res.render("list", {
        lists: lists,
        number: req.params.id,
      });
    } else {
      return res.render("list", {
        noLists: req.flash("아직 작성된 세부내역이 없습니다."),
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
