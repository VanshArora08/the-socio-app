import mongoose from 'mongoose';

let isConnected: boolean = false;
export const connectToDatabase = async () => {

    mongoose.set('strictQuery', true);
    if(!process.env.MONGODB_URI) throw new Error("MONGODB_URI not found");
    if(isConnected) return console.log("Already connected to database");

    try{
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("Connected to database");
    } catch(e){
        console.error(e);
        throw e;
    }

}