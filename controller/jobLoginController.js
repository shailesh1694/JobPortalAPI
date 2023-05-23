import userModal from "../models/userModal.js"
import { securepassword } from "./othercontroller.js";

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

export const updatePassword = async (req, res, next) => {
    const { currentpassword, newpassword } = req.body;
    try {
            if(!newpassword){
             return   next("Enter New Password First !")
            }
        const finduser = await userModal.findOne({ _id: req.user.userId })
        const isMatch = await finduser.comparePassword(currentpassword)
        if (isMatch) {
            const hashpassword = await securepassword(newpassword)
            await userModal.findByIdAndUpdate({ _id: req.user.userId }, { $set: { password: hashpassword } });
            res.status(201).send({msg:"password Update Success",success:true})
        }else{
          return  next("Credentila MisMatch or Enter change Password")
        }
    } catch (error) {
        next(error)
    }

}

export const resetpassword = async (req, res, next) => {
    const { password } = req.body;
    try {
        const finduserById = await userModal.findOne({ mobile: mobile })
        if (finduserById._id.valueOf() === req.user.userId) {
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