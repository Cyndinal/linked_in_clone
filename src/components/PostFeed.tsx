import {IPost, IPostDocument} from "@/MongoDB/models/Post";
import Post from "@/components/Post";
import post from "@/components/Post";


const PostFeed = ({posts}:{posts:IPostDocument[]})=>{
    return(
        <div>
            {posts.map((post:IPostDocument)=>(
                <Post  post={post}/>
            ))}

        </div>
    )
}

export default PostFeed