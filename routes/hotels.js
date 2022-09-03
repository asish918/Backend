import express from "express";
import { createHotel, deleteHotel, getAll, getHotel, updateHotel } from "../controllers/hotel.js";


const router = express.Router()

//CREATE
router.post("/", createHotel)

//UPDATE
router.put("/:id", updateHotel)

//DELETE
router.delete("/:id", deleteHotel)

//GET
router.get("/:id", getHotel)

//GET ALL
router.get("/", getAll)


export default router