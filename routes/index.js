const express = require("express"),
      router  = express.Router(),
      passport                        = require("passport")
      Comment                         = require("../models/comment.js"),
      Campground                      = require("../models/campground.js"),
      User                            = require("../models/users.js");


//*=================================//
//*           Root route            //
//*=================================//
router.get(`/`, function(req, res) {
  res.render(`landing`);
});



// *=================================//
// *        Register Route           //
// *=================================//
router.get("/register",(req,res)=>{
  res.render("register")
});

router.post("/register",(req,res)=>{
  User.register(new User({username: req.body.username}),req.body.password,(err,user)=>{
    if(err){
      console.log(err);
      return res.render("register");
    }else{
      passport.authenticate("local")(req,res,()=>{
      res.redirect("/campgrounds")
    });
    } 
  })
});


// *=================================//
// *           Login Route           //
// *=================================//
router.get("/login",(req,res)=>{
  res.render("login")
});

router.post("/login", passport.authenticate("local",{
  successRedirect:'/campgrounds',
  failureRedirect:"/login"
}) , (req,res)=>{});

// *=================================//
// *           Logout Route          //
// *=================================//

router.get("/logout",(req,res)=>{
  req.logout(); 
  res.redirect("/campgrounds");
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