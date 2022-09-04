import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error);
    }
}

export const updateHotel = async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true })
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(error);
    }
}

export const deleteHotel = async (req, res) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted Hotel...")
    } catch (error) {
        next(error)
    }
}

export const getHotel = async (req, res) => {
    try {
        const searchHotel = await Hotel.findById(req.params.id)
        res.status(200).json(searchHotel)
    } catch (error) {
        next(error)
    }
}

export const getAll = async (req, res, next) => {
    try {
        const searchHotels = await Hotel.find()
        res.status(200).json(searchHotels)
    } catch (error) {
        next(error)
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map(city => {
            return (await Hotel.countDocuments({ city: city }))

        }))
        const searchHotels = await Hotel.find()
        res.status(200).json(searchHotels)
    } catch (error) {
        next(error)
    }
}
export const countByType = async (req, res, next) => {
    try {
        const searchHotels = await Hotel.find()
        res.status(200).json(searchHotels)
    } catch (error) {
        next(error)
    }
}
