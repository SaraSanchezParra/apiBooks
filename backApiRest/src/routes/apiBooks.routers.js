const {Router} = require ("express");
const router = Router();
const apiBooksCtrl = require("../controller/apiBooks.controller");

router.post("/register", apiBooksCtrl.postRegister);
router.post("/login", apiBooksCtrl.postLogin);




router.get("/", apiBooksCtrl.getStart);
router.get("/books/:id", apiBooksCtrl.getBook);
router.get("/books", apiBooksCtrl.getAllBooks);
router.post("/books", apiBooksCtrl.postBook);
router.put("/books", apiBooksCtrl.putBook);
router.delete("/books/:id", apiBooksCtrl.deleteBook);

module.exports = router;