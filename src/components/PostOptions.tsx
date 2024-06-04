import {IPostDocument} from "@/MongoDB/models/Post";
import {useEffect, useState} from "react";
import {useUser} from "@clerk/nextjs";
import { Button } from "./ui/button";
import {MessageCircle, Repeat, Send, ThumbsUpIcon} from "lucide-react";
import CommentFeed from "@/components/CommentFeed";

function CommentPost(props: { postId: IPostDocument }) {
    return null;
}

const PostOptions = ({post}:{post:IPostDocument})=>{
    const [likes, setLikes] = useState(post.likes)
    const [liked, setLiked] = useState(false)
    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const {user} = useUser()

    useEffect(()=>{
        if(user?.id && post.likes?.includes(user.id)){
            setLiked(true)
        }
    },[post,user])

    return(
        <>
            <div>

                    {/*Logic for lIkes*/}
                    {likes && likes.length > 0 && (
                        <div>{likes.length} likes</div>
                    )}

                    {/*Logic for Comments*/}
                    {post.comments && post.comments.length > 0 && (
                        <div>
                            <p onClick={()=>setIsCommentOpen(!isCommentOpen)}>
                                {post.comments.length} comments</p>
                        </div>
                    )}



                 <div className={"flex justify-center"}>

                     <Button className={'text-xs m-0'} variant={"outline"}>
                    <ThumbsUpIcon size={14}/>
                </Button>


                 <Button className={'m-0 text-xs'} variant={"outline"}>
                    <MessageCircle size={14}/>
                    Message
                </Button>

                 <Button className={'m-0 text-xs'} variant={"outline"}>
                    <Repeat size={14}/>
                    Repost
                </Button>

                 <Button className={'m-0 text-xs'} variant={"outline"}>
                    <Send size={14}/>
                    Send
                </Button>

                     {isCommentOpen && (
                         <div className={'space-x-1 bg-amber-200 w-full '}>
                             {user?.id && (
                                 <CommentPost postId={post}/>
                             )}
                             <CommentFeed  />
                         </div>
                     )}


                 </div>


            </div>
       </>
    )
}

export default PostOptions