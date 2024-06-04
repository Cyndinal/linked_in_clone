"use server"


import {currentUser} from "@clerk/nextjs/server";
import {IUser} from "@/app/types/User";
import {Posts} from "@/MongoDB/models/Post";
import {AddPostRequestBody} from "@/app/api/posts/route";
import connectDb from "@/MongoDB/mongoConnection";
import {revalidatePath} from "next/cache";

const CreatePostAction =async (formData:FormData)=>{
    await connectDb();
    const user = await currentUser();
    if(!user){
        throw new Error("User must be authenticated")
    }
    const postInput = formData.get("postInput") as string
    const image = formData.get('image') as File
    let imageUrl;
    if(!postInput){
        throw new Error("Post input required!!")
    }


//     Define user
    const userDB:IUser={
        userId:user.id,
        userImage:user?.imageUrl,
        firstName:user?.firstName || "",
        lastName:user?.lastName || ""

    }
    // interface AddBodyAction{
    //     user:string,
    //     text:string,
    // }
//     upload image if there is one

    if(image.size > 0){
        //   const body:AddPostRequestBody= {
        //     user:userDB,
        //     text:postInput,
        //       imageUrl
        // }
        // await Posts.create(body)

    }else{
        const body:AddPostRequestBody= {
            user:userDB,
            text:postInput
        }
        // const newPost =await Posts.create({body})
        await Posts.create(body)
        // console.log(newPost)
        // newPost.createdAt
        console.log(`
        Post \"${body.text}"\ created by
                Firstname: ${body.user.firstName}
                Lastname:  ${body.user.lastName}
                UserID:    ${body.user.userId}
`)
    }


//     Create post in the database
//     revalidate path to the home page
    revalidatePath('/')

}

export default CreatePostAction