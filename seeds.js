var mongoose = require("mongoose");
var Campground =require("./models/campground");
var Comment = require("./models/comments");


var data=[
    {
    name:"Dehradun",
    image:"https://farm6.staticflickr.com/5187/5623797406_ea91016ac3.jpg",
    description:"This is captilar Uttarakhand. BEautiful Place ,Beautiful Weather, Beautiful People!!!\
    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.\
    Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.\
    A small river named Duden flows by their place and supplies it with the necessary regelialia. \
    It is a paradisematic country, in which roasted parts of sentences fly into your mouth. \
    Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life \
    One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar."
},{
    name:"Rishikesh",
    image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
    description:"This is one of the best place visit in uttarakhand. River Ganga flows near by. Lot of beautiful places to see.\
    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.\
    Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.\
    A small river named Duden flows by their place and supplies it with the necessary regelialia. \
    It is a paradisematic country, in which roasted parts of sentences fly into your mouth. \
    Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life \
    One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar."
}
];
function seedDB(){
Comment.remove({},function(err) {
    if(err){
        console.log(err);
    }else{
        
        Campground.remove({},function(err){
            if(err){
                console.log(err);
            }else{
        //         console.log("Removed Existing Data");
        //         data.forEach(function(campground){
        //             Campground.create(campground,function(err,campground){
        //                 if(err){
        //                     console.log(err);
        //                 }else{
        //                     console.log("Campground Added");
        //                     Comment.create({
        //                         text:"This is the best place I have Visited",
        //                         author:"Prathamesh"
        //                     },function(err,comment){
        //                         if(err){
        //                             console.log(err);
        //                         }else{
        //                             console.log("Comment is added");
        //                             campground.comments.push(comment);
        //                             campground.save(function(err,campground){
        //                                 if(err){
        //                                     console.log(err);
        //                                 }else{
        //                                     console.log("We added comment to particulaR  campground");
        //                                 }
        //                             });
        //                         }
        //                     });
        //                 }
        //             });
        //         });
                
                
             }
         }) ;  
    }
}); 
    
}

module.exports = seedDB;