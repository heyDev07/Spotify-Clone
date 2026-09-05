const express=require('express');
const cookieParser =require('cookie-parser');
const authRoutes=require('./routes/auth.routes');

const app=express();
app.use(express.json());//taaki req.body main data aa ske
app.use(cookieParser());//taaki cookie main data set kar ske

app.use('/api/auth',authRoutes);

module.exports=app;