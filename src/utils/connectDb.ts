import { error } from "console";
import mongoose from "mongoose";



if(!(process.env.DATABASE_URL)){
    console.log(process.env.DATABASE_URL)
    throw new Error(`Please add databse url in .env file ${process.env.DATABASE_URL}`)
}

const DatabaseURL:string =process.env.DATABASE_URL

let globalWithMongoose= global as typeof globalThis &{
    mongoose: any;
}

let cached=globalWithMongoose.mongoose;

if(!cached){
    cached=globalWithMongoose.mongoose={conn:null, promise:null};
}

async function connectDb() {
   if(cached.conn){
    console.log("Connection success with DB")
    return cached.conn;
   } 
   if( !cached.promise){
    const options={
        bufferCommands:false,
    };
    cached.promise=mongoose
    .connect(DatabaseURL,options)
    .then((mongoose)=>{
        console.log("Connected with mongodb")
        return mongoose;
    });
   }

   cached.conn=await cached.promise;
//    console.log(cached.conn);
   return cached.conn;
}

export default connectDb;