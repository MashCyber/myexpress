const express = require('express');
const morgan = require('morgan')
const app = express();
const redis = require('redis')
const session = require('express-session')
const {MONGO_USER,MONGO_PASSWORD,MONGO_IP,MONGO_PORT,PORT, REDIS_PORT,REDIS_URL} = require("./config/config")
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/mydb?authSource=admin`
// const mongoUrl = "mongodb://localhost:27017/mytestdb"

//Middleware
app.use(express.json())
app.use(morgan('tiny'))
//Routes
const postRouter = require('./router/postRoutes')
const userRouter = require('./router/userRoutes')

//Mongo connection String
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
//Cookie Sessions
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'siriyangu',
    cookie:{
        saveUninitialized: false,
        resave: false,
        secure:false,
        httpOnly:true,
        maxAge: 30000
      }
    }))

app.use("/api/posts/",postRouter)
app.use("/api/users/",userRouter)

app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`)
})