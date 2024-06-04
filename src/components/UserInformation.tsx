import {SignedIn, SignedOut, SignInButton, UserButton, useUser} from "@clerk/nextjs";
import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {currentUser} from "@clerk/nextjs/server";
import {Button} from "@/components/ui/button";
const UserInformation =async ()=>{
    const user = await currentUser()

    return(
        <div className={"bg-green-300 m-4 p-5 space-x-1 space-y-2 float-end rounded-lg"}>
            <div className={""}>
                <Avatar className={""}>
                    {user?.id ? (
                         <AvatarImage src={user?.imageUrl } />
                    ):
                        ( <AvatarImage src={"https://github.com/shadcn.png" } />) }

                <AvatarFallback>
                    {user?.id && (<p>{user?.firstName?.charAt(0)}-{user?.lastName?.charAt(0)}</p>)}
                </AvatarFallback>
                </Avatar>

                 <SignedIn>
                     <p className={"text-center"}> {user?.firstName} {user?.lastName}</p>
                     <div>@{user?.firstName} {user?.lastName}-{user?.id.slice(-4)}</div>
                 </SignedIn>


                <SignedOut>
                    <div className={"text-center space-y-2"}>
                        <p>You are not signed in</p>
                        <SignInButton>
                            <Button>Sign In</Button>
                        </SignInButton>

                    </div>
                </SignedOut>
            </div>
<div className={"mt-5"}>

            <div >
                Post
                <div className={"inline-flex float-right"}>
                    <p>0</p>
                </div>
            </div>

            <div >
                Comment
                <div className={"inline-flex float-right"}>
                    <p>0</p>
                </div>
            </div>
    </div>

        </div>
    )
}
export default UserInformation;