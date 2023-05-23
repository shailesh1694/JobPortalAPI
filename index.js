import express, { response } from "express";
import cors from "cors";
import morgan from "morgan";

import connectMD from "./DB/connection.js"
import { errormidleware } from "./middleware/handleerror.js";
import loginrouter from './routes/registerRoute.js'
import updaterouter from './routes/updateRoute.js'
import jobrouter from './routes/jobRoute.js'
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";
import uploadrouter from './routes/uploadfile.js'
import { createServer } from 'http'
import { Server } from "socket.io";


const app = express()
const PORT = process.env.PORT || 2000

const httpServer = createServer(app);
const io = new Server(httpServer)
io.on('connection', (socket) => {
    socket.emit("Hello", "YOu need")
    console.log(socket.id)
});

app.get("/",(req,res)=>{
    console.log("hello")

})
//ConnetToMongoDb
connectMD()

//swagger configuration

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Job Portal App"
        },
        servers: [
            {
                url: "http://localhost:2000"
            }
        ]
    },
    apis: ['./routes*.js']
}

const swaggerSpec = swaggerJSDoc(options);
//MiddleWare 
app.use(express.json())
app.use(cors())
app.use(morgan("combined"))

//cors  because from and backend use dirrent port so get this type error
app.use("/test-api/v1", loginrouter)
app.use("/update-api/v1", updaterouter)
app.use("/job-api/v1", jobrouter)
app.use("/file-api/v1", uploadrouter)

app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec))
app.use(errormidleware)

//below port for socket io
app.listen(PORT, () => { console.log(`Lisning To Port No ${PORT}`) })

// app.set('port', process.env.PORT || 5000);
httpServer.listen(5000, (e) => {
    console.log('Express server listening on port')
  })