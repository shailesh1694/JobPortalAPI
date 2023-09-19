import express from "express";
import cors from "cors";
import morgan from "morgan";

import connectMD from "./DB/connection.js"
import { errormidleware } from "./middleware/handleerror.js";
import loginrouter from './routes/registerRoute.js'
import updaterouter from './routes/updateRoute.js'
import jobrouter from './routes/jobRoute.js'
import uploadrouter from './routes/uploadfile.js'
import { Server } from "socket.io";


const app = express()
const PORT = process.env.PORT || 2000


//ConnetToMongoDb
connectMD()


//MiddleWare 
app.use(express.json())
app.use(cors())
app.use(morgan("combined"))

//cors  because from and backend use dirrent port so get this type error
app.use("/user-api/v1", loginrouter)
app.use("/update-api/v1", updaterouter)
app.use("/job-api/v1", jobrouter)
app.use("/file-api/v1", uploadrouter)

app.use(errormidleware)

//below port for socket io
app.listen(PORT, () => { console.log(`Lisning To Port No ${PORT}`) })
