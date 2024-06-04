import {Posts} from "@/MongoDB/models/Post";
import {NextResponse} from "next/server";
import connectDb from "@/MongoDB/mongoConnection";

interface UnlikePostBody{
    userId:string
}
const POST =async (req:Request,{params}:{params:{post_id:string}})=>{
    const {userId}:UnlikePostBody = await req.json()
    try{
        await connectDb();
        const post = await Posts.findById(params.post_id)

        if(!post){
            return NextResponse.json({message:"No post available"})
        }
        await post.unlikePost(userId)

        return NextResponse.json({messgae:`User of id ${post.user.userId} liked a post of id ${params.post_id}`})

    }catch(e){
        NextResponse.json({message:"Could not like post"},{status:500})
    }

}

