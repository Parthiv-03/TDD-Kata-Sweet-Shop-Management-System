const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");
const controller = require("../controllers/inventoryController");

router.post("/:id/purchase", auth, controller.purchaseSweet);
router.post("/:id/restock", auth, admin, controller.restockSweet);

module.exports = router;
