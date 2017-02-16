
var middlewareObj ={};
var Campground =require("../models/campground");

middlewareObj.checkIds= function (req,res,next){
    console.log(req.user._id);
    console.log(req.params.id);
    Campground.findById(req.params.id,function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("back");
            
        }else{
            console.log(campground.creater.id);
            if(campground.creater.id.equals(req.user._id)){
               // console.log("success");
                next();
            }else{
                req.flash("error","You must be logged in ");
                res.redirect("back");
            }
        }
    });
  
};
// middlewareObj function checkIds(req,res,next){
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
middlewareObj.isLoggedIn = function (req,res,next){
    if(req.isAuthenticated()){
        console.log("successs");
        return next();
    }
   // console.log(req);
    req.flash("error","You have to Logged In To Perform that Action");
    res.redirect("/login");
};

module.exports = middlewareObj;