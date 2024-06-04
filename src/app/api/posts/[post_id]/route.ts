import readWord from "sucrase/dist/types/parser/tokenizer/readWord";
import connectDb from "@/MongoDB/mongoConnection";
import {IPostMethod, IPostModel, Posts} from "@/MongoDB/models/Post";
import {useParams} from "next/navigation";
import {NextResponse} from "next/server";
import {auth, currentUser} from "@clerk/nextjs/server";

export const GET =async ({params}:{params:{post_id:string}})=>{
    auth().protect()
    // const {post_id} =useParams()
    try{
        await connectDb()
        const findPost = await Posts.findById(params.post_id);
        if(!findPost){
            NextResponse.json({message:"Could not find post  "})
        }
        NextResponse.json({findPost})

    }catch(e){
        NextResponse.json({message:e},{status:500})
            }

}

interface DeletePostRequestBody{
    userId:string
}
export const DELETE =async (req:Request,{params}:{params:{post_id:string}})=>{
    auth().protect()
    const user = await currentUser()
     await connectDb()
     const {userId}:DeletePostRequestBody = await req.json();
    try {
      const posts = await Posts.findById(userId);

      if(!posts){
         return NextResponse.json({message:"Post not found!!"},{status:500});
      }

      if(posts.user.userId !== user?.id || userId){
         console.log("Post does not belong to you");
      }
      await posts.removePost();
      return NextResponse.json({message:`Post of id ${params.post_id} deleted by user of id ${posts.user.userId || user?.id}`}, {status:200})

    }catch(e){
         NextResponse.json({message:"Could not delete Post"}, {status: 500})
    }}

