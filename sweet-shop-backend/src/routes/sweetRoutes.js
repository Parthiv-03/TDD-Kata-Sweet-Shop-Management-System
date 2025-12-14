const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");
const controller = require("../controllers/sweetController");

router.post("/", auth, admin, controller.addSweet);
router.get("/search", auth, controller.searchSweets);
router.get("/", auth, controller.getAllSweets);
router.put("/:id", auth, controller.updateSweet);
router.delete("/:id", auth, admin, controller.deleteSweet);

module.exports = router;
