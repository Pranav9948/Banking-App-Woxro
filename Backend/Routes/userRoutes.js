const express = require("express");

const userController = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post(
  "/get-userinfo-by-id",
  authMiddleware,
  userController.getUserInfoById
);

router.post(
  "/deposit",
  userController.depositAmount
);

router.post(
  "/getuserinformation",

  userController.getUserById
);

router.post(
  "/statements",

  userController.getUserStatements
);

router.post(
  "/withdraw",

  userController.withDrawAmount
);

router.post(
  "/transfer",

  userController.transferAmount
);

module.exports = router;
