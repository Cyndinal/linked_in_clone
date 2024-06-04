import {IPostBase, IPostModel, Posts} from "@/MongoDB/models/Post";
import {IUser} from "@/app/types/User";
import connectDb from "@/MongoDB/mongoConnection";
import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
export interface AddPostRequestBody{
    user:IUser,
    text:string,
    imageUrl?:string | null;
}
export const POST =async (req:Request)=>{
    // auth().protect()
    const { user,text,imageUrl } :AddPostRequestBody= await req.json()
    const postData:IPostBase= {
        user,
        text,
        ...(imageUrl && {imageUrl}),
    }
    try{
        await connectDb()
        const post = await Posts.create(postData)
        return NextResponse.json({post})
    }catch(e){
        NextResponse.json({message:"Could not make a post"},{status:500})
    }}
export const GET =async (req:Request)=>{
    auth().protect()
    try{
       await connectDb()
        const posts =await Posts.getAllPosts()
        return NextResponse.json({posts})
    }catch(e){
        NextResponse.json(
            {message:"Error fetching data "},
            {status:500}
        )}}
