
var express = require("express");
var router = express.Router({ mergeParams:true});

var Campground = require("../models/campground");
var Comment = require("../models/comments");

var middleware = require("../middleware");

router.get("/new",middleware.isLoggedIn,function(req, res) {
   var id=req.params.id ;
   console.log(id);
   Campground.findById(id,function(err,campground){
      if(err){
          console.log(err);
      } else{
          res.render("comment/new",{campground:campground});
      }
   });
});

router.post("/",function(req,res){
    Comment.create(req.body.comment,function(err,comment){
       if(err){
           console.log(err);
       } else{
           Campground.findById(req.params.id,function(err, campground) {
               if(err){
                   console.log(err);
               }else{
                   comment.author={
                       id:req.user._id,
                       username:req.user.username
                   };
                   comment.save(function(err,comment){
                       if(err){
                            console.log(err);
                            res.redirect("/campgrounds/"+campground._id);
                       }else{
                           console.log(comment);
                           campground.comments.push(comment);
                           campground.save(function(err,campground){
                               if(err){
                                   console.log(err);
                                   res.redirect("/campgrounds/"+campground._id);
                               }else{
                                   res.redirect("/campgrounds/"+campground._id);
                               }
                           });
                       }
                   });
                   
               }
           });
       }
    });
    
});
router.get("/:comment_id",function(req,res){
    var c_id=req.params.comment_id;
    var id=req.params.id ;
  
   Campground.findById(id,function(err,campground){
      if(err){
          console.log(err);
      } else{
            
            Comment.findById(c_id,function(err, comment) {
               if(err){
                   res.redirect("back");
               }else{
                   console.log();
                   res.render("comment/edit",{comment:comment,campground:campground});
               }
            });
         
      }
   });
    
});
router.put("/:comment_id",function(req,res){
    
       var id=req.params.comment_id;
       Comment.findByIdAndUpdate(id,req.body.comment,function(err,comment){
           if(err){
               console.log(err);
               res.redirect("/campgrounds/" + req.params.id);
           }else{
               console.log(comment);
               res.redirect("/campgrounds/"+req.params.id); 
           }
       });
    
});

router.delete("/:comment_id",function(req,res){
    var id=req.params.comment_id;
    
    Comment.findByIdAndRemove(id,function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
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