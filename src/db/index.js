import mongoose from "mongoose";

async function ConnectDB() {

    try {
        const mongoConnect = await mongoose.connect(`mongodb+srv://dracarysdragonfire8:${process.env.DB_PASSWORD}@cluster0.q8jpq2f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        //console.log(mongoConnect)
        console.log("DB connected")
    } catch (err) {
        console.log("DB connection error")
    }
}

export default ConnectDB
