import express from "express"
import { addProducts, getProducts } from "../controller/product.js";
const router=express.Router();
router.post("/addproduct",addProducts)
router.get("/",getProducts)
export default router;
