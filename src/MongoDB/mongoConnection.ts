import mongoose from "mongoose";


const connectDb =async ()=>{
    const connectionURL =`mongodb+srv://linked-in-clone:${process.env.MONGO_SECRET}@cluster0.blf8exg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    if(!connectionURL){
        console.log("Provide a connection string!!")
    }
    try{
        if(mongoose.connection.readyState>=1){return;}
        await mongoose.connect(connectionURL)
        console.log("Database connection successful!!!")

    }catch(e){
        console.log("Mongodb Connection not successful , Try again!!")

    }

}
export default connectDb;