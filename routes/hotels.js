import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router()

//CREATE
router.post("/", async (req, res) => {
    const newHotel = new Hotel(req.body)
    
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE
router.put("/:id", async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body}, 
            {new: true})
        res.status(200).json(updatedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
})
//DELETE
router.delete("/:id", async (req, res) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted Hotel...")
    } catch (error) {
        res.status(500).json(error)
    }
})
//GET
router.get("/:id", async (req, res) => {
    try {
        const searchHotel = await Hotel.findById(req.params.id)
        res.status(200).json(searchHotel)
    } catch (error) {
        res.status(500).json(error)
    }
})
//GET ALL
router.get("/", async (req, res) => {
    try {
        const searchHotels = await Hotel.find()
        res.status(200).json(searchHotels)
    } catch (error) {
        res.status(500).json(error)
    }
})


export default router