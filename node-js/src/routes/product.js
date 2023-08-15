import express from "express";
import { create, getAll, update, remove, getDetail } from "../controllers/product.js";
const router = express.Router();

router.get("/product", getAll);
router.get("/:id", getDetail);
router.post("/add", create);
router.patch("/update/:id", update);
router.delete("/:id", remove);

export default router;