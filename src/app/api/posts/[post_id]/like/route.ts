import {Posts} from "@/MongoDB/models/Post";
import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import connectDb from "@/MongoDB/mongoConnection";

export const GET =async (req:Request,{params}:{params:{post_id:string}})=>{
    try{
        await connectDb()
        const posts = await Posts.findById(params.post_id)
        if(!posts){
           return  NextResponse.json({message:"Post not found!"})
        }
        const likes = posts?.likes
        return NextResponse.json({message:likes})
    }catch (e){
        return NextResponse.json({message:'Could not like post'},{status:500})
    }
}

interface LikeRequestBody{
    userId:string
}
export const POST = async (req:Request,{params}:{params:{post_id:string}})=>{
    auth().protect()
    const {userId}:LikeRequestBody= await req.json();
    try{
        await connectDb();
        const post = await Posts.findById(params.post_id)
        if(!post){
            return NextResponse.json({message:"No post available"})
        }
        await post.likePost(userId)
        return  NextResponse.json({message:`User of id ${userId} liked a post of id ${params.post_id}`})

    }catch(e){
        NextResponse.json({message:"Could not like post"},{status:500})

    }
}