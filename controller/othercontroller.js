import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";



export const securepassword = async (password)=>{
    try {
        const hashpassword  = await bcrypt.hash(password,10)
        return hashpassword
        
    } catch (error) {
        next("Bcrypt SecurePassword")
    }
}

export const generatejwt = async (userId)=>{
 const jwt = await Jwt.sign({userId:userId},"Shailesh@1994$16&10&Mittal",{expiresIn:"180s"})
 return jwt
}