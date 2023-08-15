import express from "express";
import {
  getAll,
  create,
  remove,
  update
} from "../controllers/category.js";
const router = express.Router();

router.get("/", getAll);
// router.get("/:id", getDetail);
router.post("/add", create);
router.put("/update/:id", update);
router.delete("/:id", remove);

export default router;