const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const multer=require("multer");
const bcrypt =require("bcrypt");
const path=require("path");
const dotenv=require("dotenv");
dotenv.config();
// const { urlencoded } = require("express");
const app =express();
app.use(cors());
app.use("/uploads",express.static("uploads"));
app.listen(9985,()=>{
console.log("listening to the port 9985");
})
app.use(express.static(path.join(__dirname, './webclient/build')));
// app.use(urlencoded);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+"-"+file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })
  
let connection=async ()=>{
    try{
await mongoose.connect(`mongodb+srv://Mohan:${process.env.DB_PASSWORD}@cluster0.86ujkq9.mongodb.net/groupchattingapp`)
//mongodb+srv://Mohan:${process.env.DB_PASSWORD}@cluster0.86ujkq9.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://Mohan:<password>@cluster0.86ujkq9.mongodb.net/test
console.log("Successfully connected to MDB")  
}catch(error){
    console.log("Unable to connect to MDB") 
}
}
let userSchema=new mongoose.Schema({
   userName:{ 
    type:String,
    require:true
   },
   emailId:{
    type:String,
    validate:{
        validator:function(v){
            return /^[A-Za-z0-9.\-\_]+\@[A-Za-z0-9.\-\_]+\.([A-Za-z]{2,4})$/.test(v);
        }
    },
    message:"Invalid Email Id!"
   },
   password:{
    type:String,
    minLength:[2,"Enter Require Length of Password"],
    require:true
   },
   profilePic:String
})
let user=new mongoose.model("userdetails",userSchema);
app.post("/signupDetails",upload.single("profilePic"),async(req,res)=>{
let hashPassword=await bcrypt.hash(req.body.password,5)
let saveUserDetails=async()=>{
try{
let newUser=await new user({
    userName:req.body.userName,
    emailId:req.body.emailId,
    password:hashPassword, 
    profilePic:req.file.path
})

   await newUser.save();
   console.log("Successfully Data Send")
   res.json({
    status:"User Created Successfully"
   })
}catch(error){
    console.log("Data Unable to Send")
    res.json({
        status:"Check Details You Entered"
    }) 
}
}
let data=await user.find({userName:`${req.body.userName}`});
if(data.length>0){
    res.json({
        status:"User Name Already exist"
    })
}else{
saveUserDetails();
}

})

app.post("/login",upload.none(),async(req,res)=>{
let data=await user.find({emailId:`${req.body.emailId}`});
console.log(data);
if(data.length>0){
let passwordCheck=await bcrypt.compare(req.body.password,data[0].password);

if(passwordCheck === true){
    res.json({
        loginStatus:true,
        status:"User Successfully Login" ,
        userDetails:data
    })
}else{
    res.json({
        loginStatus:false,
        status:"Invalid Password!" 
    })
}
}else{
    res.json({
        loginStatus:false,
        status:"User Not Found"   
    })
}

})

let messageSchema=new mongoose.Schema({
    text:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    userName:{ 
        type:String,
        require:true
    }
})

let textMessages=new mongoose.model("messages",messageSchema);
app.post("/textMessages",upload.none(),async(req,res)=>{
    let saveText=async()=>{
        let newText=await new textMessages({
            text:req.body.message,
            userName:req.body.userName
        })
        try{
            await newText.save();
            console.log("Message Sent to MDB");
            res.json({
                status:"Message add to DB"
            })
        }catch(error){
            res.json({
                error
            })
        }
    }
    // console.log(req.body)
    saveText();
})

app.get("/groupMessages",async(req,res)=>{
    let data =await textMessages.find();
    // console.log(data);
    res.json({
        status:data
    })
})

app.post("/selectedUser",upload.none(),async(req,res)=>{
    let data=await user.find({_id:`${req.body.userId}`})
    // console.log(data);
    res.json({userData:data});
})

app.patch("/updateUserDetails",upload.single("profilePic"),async(req,res)=>{
    console.log(req.body)
    let data=await user.find({_id:`${req.body.id}`});
 console.log(data)
 let profilePicUpdate;
 if(req.body.profilePic==='undefined'){
    profilePicUpdate=data[0].profilePic
 }else{
    profilePicUpdate=req.body.file.path
 }
 let response=await user.updateOne({userName:`${data[0].userName}`,userName:`${req.body.userName}`,emailId:`${data[0].emailId}`,emailId:`${req.body.emailId}`
 ,profilePic:`${data[0].profilePic}`,profilePic:`${profilePicUpdate}`});
 console.log(response);
 res.json({
    status:"Profile Details Updated Successfully"
 })
}) 
connection();