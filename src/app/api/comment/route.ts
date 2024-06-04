import {Posts} from "@/MongoDB/models/Post";
import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import {IUser} from "@/app/types/User";
import {ICommentBase} from "@/MongoDB/models/Comment";
import connectDb from "@/MongoDB/mongoConnection";



interface AddCommentBody{
    user:IUser,
    text:string
}
export const POST =async (req:Request,{params}:{params:{post_id:string}})=>{
    const comment:ICommentBase =await req.json()
    // const {user,text}:AddCommentBody = await req.json()
     try{
        await connectDb();
       const post =await Posts.findById(params.post_id);
       if(!post){
           return NextResponse.json({message:"No Post found to comment on"},{status:400})
       }

       post.commentOnPost(comment)
         return NextResponse.json({message:`User of id ${post.user.userId} commented on a post of id ${params.post_id}`})

     }catch (e){
        return NextResponse.json({message:"Could not create comment successfully"},{status:500})

     }
}

export const GET =async ({params}:{params:{post_id:string}})=>{
    try{
       await connectDb();
       const post = await Posts.findById(params.post_id)
        if(!post){
            return;
        }
        await post.getAllComments()
        return NextResponse.json({message:`User of id ${post.user.userId} has commented on the post of id ${params.post_id}`})

    }catch(e){
         NextResponse.json({message:"Could comment on post"},{status:500})

    }

}