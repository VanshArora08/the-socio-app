"use server"

import { revalidatePath } from "next/cache";
import  User from "../models/user.model"
import { connectToDatabase } from "../mongoose"

interface params{
    userId:string,
    username:string,
    name:string,
    image:string,
    bio:string,
    path:string,
}

export async function updateUser(
        {userId,
        username,
        name,
        image,
        bio,
        path,}:params
        
    ):Promise<void> {
    connectToDatabase();
    try{

        await User.findOneAndUpdate({id:userId},
        {
            username: username.toLowerCase,
            name,
            bio,
            image,
            onboarded:true,
        },
        {upsert:true}
        )
        if(path==='/profile/edit'){
            revalidatePath(path);
        }
    }catch(e:any){
        // console.log(e);
        throw new Error('failed to create/update user '+e);
    }

}

export async function fetchUser(userId:string){
    try{
        connectToDatabase();
        return await User.findOne({id:userId})
    }catch(e:any){
        throw new Error('failed to fetch user form database '+e);
    }
}