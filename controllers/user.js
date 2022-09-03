import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted User...")
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const searchUser = await User.findById(req.params.id)
        res.status(200).json(searchUser)
    } catch (error) {
        next(error)
    }
}

export const getAll = async (req, res, next) => {
    try {
        const searchUsers = await User.find()
        res.status(200).json(searchUsers)
    } catch (error) {
        next(error)
    }
}
