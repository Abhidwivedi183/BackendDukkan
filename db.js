import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
const expo = async ()=>{
  try{
const conn = await mongoose.connect(process.env.MONGO_URI);
console.log("database connected");
  }catch(err){
    console.log(err);
  }
}

export default expo;