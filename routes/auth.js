import express from "express";

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hemlo Auth")
})


export default router