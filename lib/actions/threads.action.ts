'use server'

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDatabase } from "../mongoose"

interface Params {
    text:string,
    author:string,
    communityId:string | null,
    path:string
}



export async function createThread({text,author,communityId,path}:Params){

    try{
        connectToDatabase();
        const createdThread = await Thread.create({
            text,
            author,
            community:null,
        });

        //update user model
        await User.findByIdAndUpdate(author,{
            $push:{ thread:createdThread._id }
        })

        revalidatePath(path);
    }catch(err:any){
        throw new Error(err);
    }

    
}