import express from "express";

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hemlo Users")
})


export default router