const express = require('express');
const morgan = require('morgan')
const app = express();
const {MONGO_USER,MONGO_PASSWORD,MONGO_IP,MONGO_PORT,PORT} = require("./config/config")
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/mydb?authSource=admin`
// const mongoUrl = "mongodb://localhost:27017/mytestdb"

//Middleware
app.use(express.json())
app.use(morgan('tiny'))
//Routes
const postRouter = require('./router/postRoutes')
const userRouter = require('./router/userRoute')

const mongoose = require('mongoose');
const connectWithRetry =() =>{
    mongoose
    .connect(`${mongoUrl}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        console.log("##################")
        console.log("CONNECTED TO DB!!")
        console.log("##################")
    })
    .catch(e =>{
        console.log('Error:',e)
        setTimeout(connectWithRetry,5000)
    })
}
connectWithRetry()


app.use("/api/posts/",postRouter)
app.use("/api/users/",userRouter)

app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`)
})