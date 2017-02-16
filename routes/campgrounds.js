var express = require("express");
var router = express.Router();

var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");
// var methodOverride = require("method-override");

// router.use(methodOverride("_method"));
router.get("/",function(req,res){
    console.log(req.user);
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        }else{
           // console.log(campgrounds);
            res.render("campground/campgrounds",{campgrounds:campgrounds});
        }
    });
    
 //  res.render("campgrounds",{campgrounds:campgrounds});
});

router.get("/new",middleware.isLoggedIn,function(req, res) {
   res.render("campground/new"); 
});
router.get("/:id",function(req, res) {
    var id=req.params.id;
    
    Campground.findById(id).populate("comments").exec(function (err,campground) {
        if(err){
            console.log(err);
        }else{
            res.render("campground/show",{campground:campground});
        }
    });
    
});
router.get("/:id/edit",middleware.checkIds,function(req, res){
     var id=req.params.id;
      Campground.findById(id,function (err,campground) {
        if(err){
            console.log(err);
        }else{
          //  console.log(campground.description);
            res.render("campground/edit",{campground:campground});
        }
    });
});

router.put("/:id/",middleware.checkIds,function(req, res){
   var id=req.params.id;
   Campground.findByIdAndUpdate(id,req.body.campground,function(err,campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }else{
           res.redirect("/campgrounds/"+campground._id); 
       }
   });
    
    
});

router.delete("/:id",middleware.checkIds,function(req,res){
     var id=req.params.id;
     Campground.findByIdAndRemove(id,function(err){
         if(err){
             console.log(err);
             res.redirect("/campgrounds");
         }
         else{
             res.redirect("/campgrounds");
         }
     });
});
router.post("/",middleware.isLoggedIn,function (req,res) {
   var siteName = req.body.name;
   var siteUrl  = req.body.image;
   var description =req.body.description;
   
   var campground ={ name:siteName, image:siteUrl, description: description };
   Campground.create(campground,function(err,campground){
       if(err){
           console.log(err);
       }else{
          // var creater = 
           campground.creater = {
               id:req.user._id,
               username:req.user.username
               
           };
           campground.save(function(err,campground){
               if(err){
                   console.log(err);
               }else{
                  res.redirect("/campgrounds/"); 
               }
           });
            
       }
   });
   //campgrounds.push(campground);
  
});

// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         console.log("successs");
//         return next();
//     }
//   // console.log(req);
//     console.log(req.isAuthenticated());
//     res.redirect("/login");
// }

// function checkIds(req,res,next){
//     console.log(req.user._id);
//     console.log(req.params.id);
//     Campground.findById(req.params.id,function(err, campground) {
//         if(err){
//             console.log(err);
//             res.redirect("back");
            
//         }else{
//             console.log(campground.creater.id);
//             if(campground.creater.id.equals(req.user._id)){
//               // console.log("success");
//                 next();
//             }else{
//                 res.redirect("back");
//             }
//         }
//     });
   
    
// }
module.exports =router;