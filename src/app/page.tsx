import UserInformation from "@/components/UserInformation";
import UserPostInformation from "@/components/UserPostInformation";
import PostCentral from "@/components/PostCentral";
import connectDb from "@/MongoDB/mongoConnection";
import {IPostDocument, Posts} from "@/MongoDB/models/Post";
import PostFeed from "@/components/PostFeed";
export default async function Home() {
    await connectDb();
    const newPost =await Posts.getAllPosts();
    // console.log(newPost);



    return (
        <div className={"flex items-center mt-20 space-x-4 justify-between"}>

                <section className={"hidden flex-1 md:inline-grid overflow-y-visible"}>
                    <UserInformation/>
                </section>

                <section className={" flex-grow overflow-y-scroll "}>
                    <div className={"flex"}>
                        <UserPostInformation/>
                    </div>

                    <div className={"m-2 mt-40"}>
                        <PostFeed posts={newPost}/>
                    </div>
                </section>

                <section className={"hidden flex-1 md:grid bg-green-300 overflow-y-scroll "}>
                    <PostCentral/>
                </section>


            </div>

    );
}
import Post from "@/components/Post";
import post from "@/components/Post";
