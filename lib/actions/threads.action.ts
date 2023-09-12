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


export async function fetchPosts(pageNumber=1,pageSize=20){
    connectToDatabase();

    //calculate the number of posts to skip
    const skips=pageSize*(pageNumber-1);


    //fetch the posts with no parents
    const postsQuery=Thread.find({parentId:{$in:[null,undefined]}})
    .sort({createdAt:'desc'})
    .skip(skips)
    .limit(pageSize)
    .populate({path:'author',model:User})
    .populate({
        path:'children',
        populate:{
            path:'author',
            model:User,
            select:"_id name parentId image"
        }
    })

    const totalPostsCount = await Thread.countDocuments({parentId:{$in:[null,undefined]}});

    const posts = await postsQuery.exec();

    const isNext = totalPostsCount > skips+posts.length;

    return {posts,isNext};
}


export async function fetchThreadById(id:string){
    connectToDatabase();
    try{
        const thread=await Thread.findById(id).populate({
            path:'author',
            model:User,
            select:"_id id name image"
        }).populate({
            path:'children',
            populate:[
                {
                    path:'author',
                    model:User,
                    select:"_id id name parentId image"
                },
                {
                    path:'children',
                    model:Thread,
                    populate:{
                        path:'author',
                        model:User,
                        select:"_id id name parentId image"
                    }
                }
            ]   
        }).exec();
        return thread;
    }catch(err:any){
        throw new Error(err);
    }
}

export async function addCommentToThread(
    threadId:string,
    commentText:string,
    userId:string,
    path:string
){
    connectToDatabase();
    try{
        // create the comment
        const originalThread = await Thread.findById(threadId);
        if(!originalThread){
            throw new Error('Thread not found');
        }

        const commentThread=new Thread({
            text:commentText,
            author:userId,
            parentId:threadId,
        })
        const savedComment = await commentThread.save();

        //update the original thread
        originalThread.children.push(savedComment._id);
        await originalThread.save();
        revalidatePath(path); 

    }catch(err:any){
        throw new Error(err);
    }
}