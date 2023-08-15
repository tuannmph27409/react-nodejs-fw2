
import express from "express";
import routerProduct from "./routes/product.js";
// import routerAuth from "./routes/auth.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
// import router from "./routes/index.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())
mongoose.connect(`${process.env.API_DB}`)

app.use("/api", routerProduct);
// app.use("/api", routerAuth);

export const viteNodeApp = app;
/**
 * Step 1: install json-server
 * Step 2: install concurrently
 * Step 3: install axios
 * Step 4: edit package.json
 * Step 5: setting "type": "module" in package.json
 * Step 6: Add method getAll, getDetail, post, put, delete
 */

/**
 * 1. Tao folder
 * 2. Tao file app.js
 * 3. npm init
 * 4. install các thư viện: express, nodemon, concurrently, dotenv, axios, json-sever
 * 5. Import Express và cấu hình trong file app.js
 * 6. Tạo routes/product.js và cấu hình các routes tại đây.
 * 7. Tạo controllers/product.js và cấu hình các controllers tại đây.
 *
 */
