import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.get("/", (req,res)=>{
    res.json("Hello from Server")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})