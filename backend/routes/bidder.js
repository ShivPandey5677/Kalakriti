import express from "express"
import { getBidders, placeBid } from "../controller/bidder.js";
const router =express.Router()
router.post("/placebid",placeBid);
router.get("/",getBidders)
export default router