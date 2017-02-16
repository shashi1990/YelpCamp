var express= require("express"),
    app = express(),
    bodyParser=require("body-parser"),
    mongoose=require("mongoose"),
    Campground=require("./models/campground"),
    Comment=require("./models/comments"),
    passport=require("passport"),
    passportLocal=require("passport-local"),
    User=require("./models/user"),
    expressSession=require("express-session"),
    seedDB = require("./seeds");
   
var methodOverride = require("method-override");
var flash =require("connect-flash");

var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes =require("./routes/comments"),
    authRoutes =require("./routes/index");
    
app.use(methodOverride("_method"));
app.use(flash()); 

mongoose.connect("mongodb://localhost/yelpCamp");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname+"/public"));
console.log(__dirname+"/public");

app.use(expressSession({
    secret:"Prathamesh stil havn't called back",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new passportLocal(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use(function(req,res,next){
    res.locals.CurrentUser = req.user;
    res.locals.error =req.flash("error");
    res.locals.success =req.flash("success");
    next();
});

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id",commentRoutes);
app.use(authRoutes);
// seedDB();

// Campground.create({
//   name:"Dehradun",
//   image:"https://farm6.staticflickr.com/5187/5623797406_ea91016ac3.jpg",
//   description:"This is captilar Uttarakhand. BEautiful Place ,Beautiful Weather, Beautiful People!!!"
// },function(err,campground){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Campground added");
//         console.log(campground);
//     }
    
// });

//  var campgrounds=[
//         {name:"Rishikesh",image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
//         {name:"Utarkashi",image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
//         {name:"Dehradun",image:"https://farm6.staticflickr.com/5187/5623797406_ea91016ac3.jpg"},
//         {name:"Mahabaleshwar", image:"https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
//         {name:"Rishikesh",image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
//         {name:"Utarkashi",image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
//         {name:"Dehradun",image:"https://farm6.staticflickr.com/5187/5623797406_ea91016ac3.jpg"},
//         {name:"Mahabaleshwar", image:"https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
//         {name:"Rishikesh",image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
//         {name:"Utarkashi",image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
//         {name:"Dehradun",image:"https://farm6.staticflickr.com/5187/5623797406_ea91016ac3.jpg"},
//         {name:"Mahabaleshwar", image:"https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
//         {name:"Rishikesh",image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
//         {name:"Utarkashi",image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
//         {name:"Dehradun",image:"https://farm6.staticflickr.com/5187/5623797406_ea91016ac3.jpg"},
//         {name:"Mahabaleshwar", image:"https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"}
//         ];

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("The YelpCamp is started"); 
});