import mongoose from "mongoose";

async function ConnectDB() {

    try {
        const mongoConnect = await mongoose.connect(`mongodb+srv://dracarysdragonfire8:${process.env.DB_PASSWORD}@backend.cssseva.mongodb.net/?retryWrites=true&w=majority&appName=backend`)
        console.log(mongoConnect)
    } catch (err) {
        console.log(err)
    }

}
export default ConnectDB
