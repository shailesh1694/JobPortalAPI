import mongoose from "mongoose";

const connectMD =async ()=>{
    try {
        const connection = await mongoose.connect("mongodb://127.0.0.1:27017/jobPortal")
        console.log(`Connecting To MD DataBase ${mongoose.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

export default connectMD;