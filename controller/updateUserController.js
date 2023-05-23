import userModal from "../models/userModal.js";
import bcrypt from "bcryptjs";


export const updateUserController = async (req, res, next) => {
    try {
        const { firstname, lastname, email, mobile, birth, gender } = req.body
        const finduser = await userModal.findOneAndUpdate(req.user.userId, req.body)
        return res.status(200).send("Update Details ")
    } catch (error) {
        next(error)
    }

}


