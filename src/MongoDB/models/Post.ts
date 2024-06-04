import {IUser} from "@/app/types/User";
import {Comment,IComment, ICommentBase} from "@/MongoDB/models/Comment";

import mongoose, {model, Model, models, Schema} from 'mongoose';
import {ObjectId} from "mongodb";
// import {Comment} from "@/MongoDB/models/Comment";
// let comments=[]

export interface IPostBase {
    user:IUser,
    text:string,
    imageUrl?:string,
    comments?:IComment[],
    likes?:string[]
}
export interface IPost extends IPostBase{
    createdAt:Date;
    upDateAt:Date;
}


export interface IPostMethod{
    likePost(userId:string):Promise<IPost>;
    unlikePost(userId:string):Promise<IPost>;
    commentOnPost(comment:ICommentBase[]):Promise<IPost>;
    getAllComments():Promise<IComment[]>;
    removePost(userId:String):Promise<IPost>;
}
// made changes by adding IPostBase to IPostDocument to check an error
export interface IPostDocument extends IPost,IPostMethod{}
interface IPostStatic{
    getAllPosts():Promise<IPostDocument[]>
}
export interface IPostModel extends IPostStatic,Model<IPostDocument>{}

const PostSchema = new mongoose.Schema({
      user:{
        userId: {type:String},
        userImage: {type:String},
        firstName: {type:String},
        lastName: {type:String}
    },
        text:{type:String},
        imageUrl:{type:String},
        comment:{type:[Schema.Types.ObjectId], ref:'Comment' , default:[]},
        likes:{type:[String]}


},{timestamps:true})

PostSchema.methods.likePost= async function(userId:string){
    try{
        // await this.updateOne({userId},{$addToSet:{likes:{userId}}})
        await this.model('Post').updateOne({userId},{$addToSet:{userId}})
    }catch(e){
        console.log("Error liking Post")
    }}
PostSchema.methods.unlikePost = async function (userId:string){
    try{
        // this.updateOne({userId},{$pull:{likes:userId}})
        this.model('Post').updateOne({userId},{$pull:{likes:userId}})
    }catch(e){console.log("Cannot remove post",e)}
}

PostSchema.methods.removePost = async function({params}:{params:{userId:IPostBase}}){
    try{
        // this.model("Post").deleteOne({_id:this._id})
        await Posts.deleteOne(params.userId)
    }catch(e){
        console.log("Cannot remove Post ")
    }}

PostSchema.methods.commentOnPost = async function(commentToAdd:ICommentBase){
    try{
        const comment =await Comment.create(commentToAdd)
         // const comments=[]
        this.comments.push(comment._id)
        await this.save()
    }catch(e){
        console.log("Could not comment on Post")
    }}

PostSchema.methods.getAllComments = async function(){
    try{
       await this.populate({
           path:"comments",
           options:{sort:{createdAt:-1}}
       })
           return this.comments;
        }catch(e){
    }
}

PostSchema.statics.getAllPosts = async function(){
    try{
   return await Posts?.find().lean().sort({createdAt:-1})

        // return posts.map((post:IPost)=>({
        //     ...post,
        //     _id:post.user.userId.toString()
        //
        // }))
       // const posts =this.find()
       //              .sort({createdAt:-1})
       //              .populate({path:"comments"}).lean()
       //   return posts.map((item:IPost)=>({
       //      ...item,
       //      _id:item.user.userId.toString(),
       //       // comments:item?.comments?.map((comment:IComment)=>({
       //       //     ...comment
       //       // }))
       //
       //  }))
    }catch(e){
        console.log("Getting all post not successful!")

    }
}

export const Posts= models.Post as IPostModel || mongoose.model<IPostDocument,IPostModel>("Post",PostSchema);

