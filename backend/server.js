import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'

//app config
const app = express()
const port=4000
 
//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();


//api endpoint
app.use("/api/food",foodRouter)
app.use("/image",express.static('upload'))

app.get("/",(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>{
    console.log(`server started  on http://localhost:${port}`)
}) 


//mongodb+srv://MMM:PROJECT2025@cluster0.jbnp9m6.mongodb.net/?
//mongodb+srv://MMM:PROJECT2025@cluster0.jbnp9m6.mongodb.net/?appName=Cluster0