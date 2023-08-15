
import express from "express";
import routerCategory from "./category";
import routerProduct from "./product";
import routerAuth from "./auth";

const router = express.Router();

router.use("/categories", routerCategory);
router.use("/product", routerProduct);
router.use("/auth", routerAuth);

export default router;