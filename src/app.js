import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

//middlewares
//we use cors middleware - we get options with cors 1.to define source to allow - corse({origin:process.env.CORS_ORIGIN,credentials::true})
app.use(cors())
//cookie-parser is used to get cookie data from browser - it also gets options
app.use(cookieParser())

//.json .urlencoded .static etc are built in express middlewares, we can use custom middleware.
//express to limit the json data that can be sent
app.use(express.json({limit:"16kb"}))
//express for urlencoded - (some url will be with +, others will be with %, some with %20).
app.use(express.urlencoded({extended:true}))

//express static is used to serve files from mentioned folder(ex.public) directly.
//if server runs on localhost:3000, and public folder as index.js, it can be accessed via https://localhost:3000/index.js
app.use(express.static("public"))


//app is exported and we can do app.listen in the file(as required) we want to start the server
export {app}