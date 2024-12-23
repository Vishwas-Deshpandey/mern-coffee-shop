import mongoose from "mongoose";

export const connectToMongoDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Database Connected")
    } catch (error) {
        console.log(`Failed To Connect With The Database the server respond ${error.messsage}`)
    }
}
