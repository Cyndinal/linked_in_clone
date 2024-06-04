"use client"
import {SignedIn, UserButton, useUser} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import {useRef, useState} from "react";



import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ImageIcon, XIcon} from "lucide-react";
import Image from "next/image";
import CreatePostAction from "@/Actions/CreatePostAction";
import {Input} from "postcss";
import connectDB from "@/MongoDB/mongoConnection";

const userPostInformation =()=>{
    const [preview , setPreview] = useState<string |null >(null)
    const {user} = useUser()
    const ref = useRef<HTMLFormElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Handling formData
    const handleformSubmission = async (formData:FormData)=>{
        const formDataCopy = formData;
        const text = formDataCopy.get("postInput") as string
         ref.current?.reset()
        // const image = formDataCopy.get("image")
    if(!text.trim()){
       throw new Error("You must provide a post!");
    }
    console.log("Text submitted!!!")
    setPreview(null)
        try{
         // await connectDB()
         await CreatePostAction(formDataCopy);

        }catch(e){
        console.log("Error creating post",e)

        }
}

    const handleImage = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const file=  event.target.files?.[0]
    if(file){
        setPreview(URL.createObjectURL(file));
    }
}

    return(
        <form ref={ref}
              className={'bg-blue-100'}
              action={(formData) => {
                  const promise = handleformSubmission(formData)
              }}

            // action={formData => {
            //     const promise = handleformSubmission;
            // }}
        >
            <div className={"flex-1 items-center fixed  md:rounded-lg  bg-blue-400 z-50"}>
                <div className={"p-3"}>
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
                    <input type={'text'}
                           name={"postInput"}
                           placeholder={"Start writing a post...."}
                           className={"p-2 w-80 outline-none m-2 rounded-xl"}/>

                    <div className={"flex-col ml-2.5 md:flex-inline"}>
                        <button onClick={() => fileInputRef.current?.click()}
                                className={"flex items-center bg-black text-white p-2 rounded-xl text-sm "}
                                type={'button'}>
                            <ImageIcon size={14}/>
                            {preview ? ("Change") : ("Add")} Image
                        </button>
                    </div>

                </div>

                {/*<Button hidden type="submit"*/}
                {/*        className={'hidden bg-blue-300 md:inline md:float-right '}>*/}
                {/*    Submit*/}
                {/*</Button>*/}



            </div>


            {/*<div className={"flex ml-2.5 md:flex-inline"}>*/}
            {/*    <Button type="submit"*/}
            {/*            className={' bg-blue-300'}>*/}
            {/*        Submit*/}
            {/*    </Button>*/}
            {/*</div>*/}


            <input ref={fileInputRef}
                   hidden type={"file"} accept={"image/*"}
                   onChange={handleImage}
                   name={"image"}/>

            {preview && (
                <div className={"sticky z-50 w-80"}>
                    <img src={preview} alt={"Preview"}
                         className={"object-cover"}/>
                </div>
            )}


            {preview && (
                <Button variant={'destructive'}

                        onClick={() => setPreview(null)}>
                    <XIcon size={14}/>
                    Remove Image
                </Button>
            )}


        </form>
    )
}
export default userPostInformation