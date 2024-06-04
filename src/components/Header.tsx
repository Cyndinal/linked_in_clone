
import Image from "next/image";
import {BriefcaseIcon, HomeIcon, MessageCircleIcon, NetworkIcon, SearchIcon, UserIcon} from "lucide-react";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";

const Header = ()=>{
    return(

        <div className="flex items-center mb-10 justify-center w-full space-x-4 mx-auto rounded-xl fixed z-50 bg-red-400">
            <div>
                <Image
                    priority={true}
                    width={60} height={60}
                    className="object-cover object-center"
                    src="ico.svg"
                    alt={"logoIcon"} />
            </div>

            <SearchIcon/>
            <div className={'flex'}>
                <input type={'text'} placeholder={'Search Here...'} className={"h-5 p-4 bg-amber-50 border-none"}/>
            </div>

            {/*Services*/}
            <div className={"flex items-center  space-x-2 "}>
                <div className={" "}>
                    <HomeIcon/>
                </div>

                <div className={"hidden md:inline  "}>
                    <NetworkIcon/>
                    <h6 className={"hidden "}>Network</h6>
                </div>


                <div className={"hidden md:inline"}>
                    <MessageCircleIcon/>

                </div>


                <div className={"hidden md:inline "}>
                    <BriefcaseIcon/>
                </div>


            </div>

            <div className={"ml-4"}>
                <SignedOut>
                    <SignInButton>
                       <Button>
                           Sign In
                       </Button>
                   </SignInButton>
                </SignedOut>

                <SignedIn>
                  <UserButton/>
                </SignedIn>

            </div>


        </div>

    )
}

export default Header;