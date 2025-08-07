import express from "express";
import expo from "./db.js";
const app = express();
import dotenv from "dotenv";
import productmodule from "./models/product.js";
import cors from "cors";
dotenv.config();
app.use(express.json());
app.use(cors({
    origin:"https://frontend-dukan.vercel.app",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))
// console.log(process.env.MONGO_URI);
app.get("/",(req,res)=>{
    res.send("hello i am running");
})

app.get("/api/products",async (req,res)=>{
    try {
        const products = await productmodule.find({});
        res.status(200).json({success:true,data:products});
    } catch (error) {
        res.status(500).json({success:false,message:"it giving error"});
    }
})



app.put("/api/products/:id",async(req,res)=>{
    const {id} = req.params;
    const prd = req.body;
    console.log(prd);
    try {
        console.log(id);
        const prdupdated = await productmodule.findByIdAndUpdate(id,prd,{new:true});
res.status(200).json({success:true,message:"updates successfullt",data:prdupdated});
    } catch (error) {
        res.status(400).json({success:false,message:"updation karte waqt error aaya hai" ,data:error.message});
    }
})


app.post("/api/products",async (req,res)=>{
const prd = req.body;
if(!prd.name || !prd.price|| !prd.image){
    return res.status(400).json({success:false,message:"kuch gadbad dali hai"});
}
const s = new productmodule(prd);
try {
    await s.save();
    res.status(201).json({success:true,message:"badhiya kaam"})
} catch (error) {
    res.status(500).json({success:false,message:"error"})
}

})

app.delete("/api/products/:id",async (req,res)=>{
const {id} = req.params;
try{
await productmodule.findByIdAndDelete(id);
res.status(200).json({success:true,message:"product deleted"});
}catch(error){
    res.status(500).json({success:false,message:"it giving error"});

}
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    expo();
    console.log("server is running");
})

