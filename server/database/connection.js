import mongoose from "mongoose";

export default async () => {
    return mongoose.connect(process.env.MongoDB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};