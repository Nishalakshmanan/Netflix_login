import express from "express"
import cors from "cors"
const users=[]
const app=express()//storing the install provided by the app
console.log(users)
app.use(cors())

app.use(express.json())

app.post("/signup",(req,res)=>{
  console.log("signup request reached the server")
  const {email,password}=req.body;
  const loginedUser=users.find((user)=>{
    if(email==user.email){
      return true
    }
  })
  if(loginedUser){
    res.status(409).send({message:"An account already exists with this email"})
  }
  else{
  users.push({email,password})
  console.log(users)
   res.send("Signed Up successfully")
  }
 
})

app.post("/login",(req,res)=>{
  console.log("login request reached the server")
  const {email,password}=req.body;
  const loginedUser=users.find((user)=>{
    if(email==user.email){
      return true
    }
  })
  if(!loginedUser){
     res.status(401).send({message:"No account found with this email.Please SignUp"})
  }
  else if(loginedUser.password!==password){
     res.status(401).send({message:"Incorrect password"})
  }
  else{
     res.send({message:"Login sucessful"})
  }
})

app.listen(3000,()=>{
   
    console.log("started listening")
     
})

