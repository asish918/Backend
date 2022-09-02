import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import roomRoute from "./routes/room.js"
import hotelsRoute from "./routes/hotels.js"
import usersRoute from "./routes/users.js"
const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected...")
})

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected...")
})

//middlewares
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/room", roomRoute);

app.listen(8000, () => {
    connect()
    console.log("Connected to backend...")
})