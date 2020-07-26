const express = require("express"),
      router  = express.Router(),
      Comment                         = require("../models/comment.js"),
      Campground                      = require("../models/campground.js"),
      User                            = require("../models/users.js");



//*=================================//
//*          Index route            //
//*=================================//
router.get("/", function(req, res) {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campground: campgrounds ,currentUser:req.user});
    }
  });
});


//*=================================//
//*            New route            //
//*=================================//
router.get(`/new`, isLoggedIn , (req, res)=> {
  res.render("campgrounds/new");
});


//*=================================//
//*            Create route         //
//*=================================//
router.post(`/`, isLoggedIn , function (req, res) {
      if(req.body.campground.image ==""|| req.body.campground.name =="" || req.body.campground.description ==""){
        res.render("campgrounds/new");
      } else {
      Campground.create(req.body.campground, function (err, campgrounds) {
        if (err) {
            res.send(alert(err));
        } else {
            console.log("Data added Successfully");
            res.redirect(`/campgrounds`);
        }
    });
    }
});


//*=================================//
//*            Show route           //
//*=================================//
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec((err, CampgroundDetails) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", { campground: CampgroundDetails });
    }
  });
});


//*=================================//
//*            Edit route           //
//*=================================//
router.get("/:id/edit",isLoggedIn, function(req, res) {
  Campground.findById({ _id: req.params.id }, function(
    err,
    editCampgroundDetails
  ) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/edit", { campground: editCampgroundDetails });
    }
  });
});


//*=================================//
//*          update route           //
//*=================================//
router.put("/:id",isLoggedIn, function(req, res) {
  Campground.findOneAndUpdate(
    { _id: req.params.id },
    req.body.campground,
    function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect(`/campgrounds/` + req.params.id);
      }
    }
  );
});


//*=================================//
//*          delete route           //
//*=================================//
router.delete("/:id", isLoggedIn, function(req, res) {
  Campground.findByIdAndDelete({ _id: req.params.id }, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
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





