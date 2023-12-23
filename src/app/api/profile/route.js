import { Mongoose } from "mongoose";

export async function Post() {
    Mongoose.connect(process.env.MONGO_URL);
}