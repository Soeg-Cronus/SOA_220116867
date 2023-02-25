const express = require("express");
const { queryUser, insertUser, loginUser, updateUser, addFriend } = require("../controllers/user");
const router = express.Router();

router.get("/", queryUser);

router.post("/user", insertUser);
router.post("/login", loginUser);
router.put("/user", updateUser);
router.post("/friend",addFriend);
// router.get("/",queryBuku)
// router.get("/:buku_id",getSingleBuku)
// router.post("/",insertBuku)
// router.put("/:buku_id",updateBuku)
// router.patch("/:buku_id",updateBuku)
// router.delete("/:buku_id",deleteBuku)

module.exports = router;
//npm install --save sequelize
//npm install --save mysql2
