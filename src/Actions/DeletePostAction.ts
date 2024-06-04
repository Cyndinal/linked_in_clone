"use server"
import {currentUser} from "@clerk/nextjs/server";
import Post from "@/components/Post";
import {IPost, Posts} from "@/MongoDB/models/Post";
import {revalidatePath} from "next/cache";
import {ObjectId} from "mongoose";
import post from "@/components/Post";

const DeletePostAction =async (userId:String)=>{
    const user = await currentUser();
    if(!user?.id){
        console.log('User not authenticated!');
    }

    const getPost =await Posts.findById({userId});
    if(!getPost){
        return console.log("Posts you can delete cannot be found!")
    }

    if(getPost.user.userId !== user?.id){
        return console.log("Post does not belong to you!")
    }
    try{
        await getPost.removePost(user.id)
        console.log("Removing post successful!")
    }catch(e){
        console.log("Error removing post",e)
    }
    revalidatePath("/")
}
export default DeletePostAction;