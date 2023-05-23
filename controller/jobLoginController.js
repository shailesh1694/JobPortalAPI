import userModal from "../models/userModal.js"
import { securepassword } from "./othercontroller.js";
import { generatejwt } from "./othercontroller.js";
import bcrypt from "bcryptjs";

export const getRegisterController = async (req, res, next) => {
    try {
        const { firstname, lastname, email, password, mobile, birth, gender } = req.body
        const existuser = await userModal.findOne({ $and: [{ email: email }, { mobile: mobile }] })
        if (existuser) {
            return res.status(200).send({ success: false, msg: "Already Registered Please Login" })
        }
        const newuser = await userModal.create(req.body)
        const token = newuser.createJWt()
        res.status(201).send({ success: true, msg: "User Register Successfully", token: token })
    } catch (error) {
        next(error)
    }
}

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return next("Email or Password Wrong !")
        }
        const user = await userModal.findOne({ email })
        if (!user) {
            return next("Invalid Credential !")
        }
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return next("Email Or password Wrong!")
        }
        const token = user.createJWt()
        res.status(200).send({
            success: true,
            token: token,
            userId: user._id,
            msg: "Login Successfull"
        })
    } catch (error) {
        console.log(error)
    }
}

export const forgotpassword = async (req, res, next) => {
    const { email, mobile, birth } = req.body;
    try {
        const finduser = await userModal.findOne({ $and: [{ $or: [{ email: email }, { mobile: mobile }] }, { birth: birth }] })
        if (finduser) {
            const forgettoken = await generatejwt(finduser._id.valueOf())
            res.status(200).send({
                Barear: forgettoken, success: true
            })
        } else {
            return next("User Not Found")
        }
    } catch (error) {
        next(error)
    }

}

export const resetpassword = async (req, res, next) => {
    const { password ,mobile} = req.body;
    try {
        const finduserById = await userModal.findOne({ mobile: mobile })
        if (finduserById._id.valueOf()=== req.user.userId) {
            const hashpassword = await securepassword(password)
            await userModal.findByIdAndUpdate({ _id: req.user.userId }, { $set: { password: hashpassword } })
            res.send({ msg: "password reset successfull", success: true })
        } else {
            next("User Not Found")
        }

    } catch (error) {
        next(error)
    }

} 