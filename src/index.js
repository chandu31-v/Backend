//require('dotenv').config()
import { app } from "./app.js"
import ConnectDB from "./db/index.js"

ConnectDB()
.then(()=>{
    app.listen(3000,()=>{
        console.log("server started on 3000")
    })
})
