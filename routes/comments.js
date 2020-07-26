const express = require("express"),
      router  = express.Router({mergeParams:true}),
      
      Comment                         = require("../models/comment.js"),
      Campground                      = require("../models/campground.js");

//*=================================//
//*         Comment Routes          //
//*=================================//
router.get("/new", isLoggedIn , (req,res)=>{
  Campground.findById(req.params.id, (err,campground)=>{
    if (err) {
      console.log(err)
    } else {
      res.render("comments/new", {campground:campground})
    }
  })
});

//*=================================//
//*           Add Comment           //
//*=================================//
router.post("/",(req,res)=>{
  Campground.findById(req.params.id,(err,campground)=>{
    if(err){
      console.log(err);
      res.redirect("/campgrounds/"+req.params.id)
    }else{
      Comment.create(req.body.comment,(err,comment)=>{
        if(err){
          console.log(err);
        }else{
          console.log(campground.comments)
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/"+req.params.id)
        }
      })
    }
  })
});
//*=================================//
//*         helper function         //
//*=================================//
function isLoggedIn(req,res,next){
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login")
  }
}
module.exports = router;