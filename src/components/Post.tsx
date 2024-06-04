'use client'
import ReactTimeago from "react-timeago";
import React from 'react';
import {IPostDocument} from "@/MongoDB/models/Post";
import {useUser} from "@clerk/nextjs";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"
import {Button} from "@/components/ui/button";
import {TrashIcon} from "lucide-react";
import DeletePostAction from "@/Actions/DeletePostAction";
import {ObjectId} from "mongodb";
import PostOptions from "@/components/PostOptions";
function Post({post}:{post:IPostDocument}) {

     const {user} = useUser()
    const isAuthor = user?.id === post.user?.userId;
    return (
        <div className={"bg-green-100 relative rounded-xl "}>

            <div className={"flex items-center text-xs p-4 "}>
                <div className={"m-2"}>
                    <Avatar className={""}>
                        {user?.id ? (
                                <AvatarImage src={user?.imageUrl}/>
                            ) :
                            (<AvatarImage src={"https://github.com/shadcn.png"}/>)}

                        <AvatarFallback>
                            {user?.id && (<p>{user?.firstName?.charAt(0)}-{user?.lastName?.charAt(0)}</p>)}
                        </AvatarFallback>
                    </Avatar>

                </div>


                <div>
                                <span>{user?.firstName} {user?.lastName}
                                    {isAuthor && <Badge variant={'secondary'}>Author</Badge>}
                                </span>
                    <p>@{user?.firstName}_{user?.lastName}_{user?.id.slice(-4)}</p>
                    <p>
                        <ReactTimeago date={new Date(post.createdAt)}/>
                    </p>
                </div>
            </div>

            <div className={"flex items-center justify-center mt-0 mb-5 font-semibold space-x-4 space-y-2"}>
                {post.text}
            </div>

            {isAuthor &&
                <div className={"flex items-center float-end"}>
                    <Button
                        variant={'destructive'} className={'relative'}
                        // onClick={()=>DeletePostAction(post?._id)}
                    >
                        <TrashIcon size={16}/>
                    </Button>
                </div>}

            <div><PostOptions post={post}></PostOptions></div>

            <hr className={"bg-white pb-1 w-full gap-5 space-x-4 space-y-2 rounded-b-full"}/>
        </div>
    );
}

export default Post;