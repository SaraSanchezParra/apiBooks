const {Router} = require ("express");
const router = Router();
const apiBooksCtrl = require("../controller/apiBooks.controller");

router.post("/register", apiBooksCtrl.postRegister);
router.post("/login", apiBooksCtrl.postLogin);

module.exports = router;