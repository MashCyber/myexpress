const express = require('express');
const { PORT } = require('./config/config');
const app = express();
const mongoUrl = `mongodb://localhost:27017/myblogdb`
// const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
// const mongoURL = `mongodb://root:mypassword@$127.0.0.1:27017/myblogdb?authSource=admin`

//Middleware
app.use(express.json())

//Routes
const postRouter = require('./router/postRoutes')

const mongoose = require('mongoose');
const connectWithRetry =() =>{
    mongoose
    .connect(`${mongoUrl}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        console.log("CONNECTED TO DB!!")
    })
    .catch(e =>{
        console.log('Error:',e)
        setTimeout(connectWithRetry,5000)
    })
}
connectWithRetry()


app.use("/api/posts/",postRouter)

app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`)
})