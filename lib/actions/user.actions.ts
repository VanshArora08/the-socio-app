"use server"

import { revalidatePath } from "next/cache";
import  User from "../models/user.model"
import { connectToDatabase } from "../mongoose"
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

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
            username: username.toLowerCase(),
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

export async function fetchUserPosts(userId:string){
    connectToDatabase();
    try{
        const threads=await User.findOne({id:userId})
        .populate({
            path:'threads',
            model:Thread,
            populate:{
                path:"children",
                model:Thread,
                populate:{
                    path: "author",
                    model:User,
                    select:"name image id"
                }
            }
        });
        return threads;
    }catch(e:any){
        throw new Error('failed to fetch user posts '+e);
    }
}

export async function fetchUsers({
    userId,
    searchTerm="",
    pageNumber=1,
    pageSize=20,
    sortBy="desc"
 }:{
        userId:string,
        searchTerm?:string,
        pageNumber?:number,
        pageSize?:number,
        sortBy?:SortOrder
 }){
    try{
        connectToDatabase();

        const skipAmount=(pageNumber-1)*pageSize;

        const regex=new RegExp(searchTerm,'i');

        const query:FilterQuery<typeof User>={
            id:{$ne:userId},
        }

        if(searchTerm.trim()!==''){
            query.$or=[
                {username:{$regex:regex}},
                {name:{$regex:regex}},
            ]
        }

        const sortOptions={createdAt:sortBy};

        const users=await User.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize);

        const totalUsers=await User.countDocuments(query);

        const isNext=totalUsers>skipAmount+users.length;

        return {
            users,
            isNext,
        }
        // const regex=new RegExp(searchTerm,'i');
        // return await User.find({});
    }catch(e:any){
        throw new Error('failed to fetch users '+e);
    }
}