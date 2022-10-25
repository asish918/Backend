import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js"

export const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try{
        const savedRoom = await newRoom.save()

        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push : { rooms: savedRoom._id},
            })
        } catch(error) {
            next(error)
        }

        res.status(200).json(savedRoom);
        
    } catch(error) {
        next(error)
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true })
        res.status(200).json(updatedRoom)
    } catch (error) {
        next(error);
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
       const updatedRoom =  await Room.updateOne({"roomNumbers._id": req.params.id}, {
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
            }
        })
        res.status(200).json(updatedRoom)
    } catch (error) {
        next(error);
    }
}

export const deleteRoom = async (req, res) => {
    const hotelId = req.params.hotelId;

    try {
         await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            })
        } catch (error) {
            next(error)
        }
        
        res.status(200).json("Deleted Room...")
    } catch (error) {
        next(error)
    }
}

export const getRoom = async (req, res) => {
    try {
        const searchRoom = await Room.findById(req.params.id)
        res.status(200).json(searchRoom)
    } catch (error) {
        next(error)
    }
}

export const getAll = async (req, res, next) => {
    try {
        const searchRooms = await Room.find()
        res.status(200).json(searchRooms)
    } catch (error) {
        next(error)
    }
}
