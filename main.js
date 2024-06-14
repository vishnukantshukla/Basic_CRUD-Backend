// import
require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const session=require('express-session');

const app=express();



const PORT=process.env.PORT || 4000;

// Database connection

// mongoose.connect(process.env.DB_URI,{useNewURLParser : true,useUnifiedTopology:true});
mongoose.connect(process.env.DB_URI);
const db=mongoose.connection;
db.on('error',(error)=>console.log(error));
db.once('open',()=>console.log('MongoDb connected successfully')); 


// middleware

app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use(session({
    secret:'Vishnukant Shukla',
    saveUninitialized:true,
    resave:false,

}))

// router prefix
app.use("",require("./routes/routes"))


app.use((req,res,next)=>{
    res.locals.message=req.session.message;
    delete req.session.message;
    next();
});

app.use(express.static('uploads'));

 
// set template engine 

app.set("view engine","ejs");




app.listen(PORT,()=>{
    console.log(`Server connnected successfully http://localhost:${PORT}`);
})