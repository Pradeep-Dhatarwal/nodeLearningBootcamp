
// *=================================//
// *           Packages              //

const campground = require("./models/campground.js");
const { session } = require("passport");
const passport = require("passport");

// *=================================//
const express                     = require(`express`),
  app                             = express(),
  expressSession                  = require("express-session")
  bodyParser                      = require(`body-parser`),
  methodOverride                  = require("method-override"),
  mongoose                        = require(`mongoose`),
  passport                        = require("passport"),
  localStrategy                   = require("passport-local"),
  passportLocalMongoose           = require("passport-local-mongoose"),
  User                            = require("./models/users.js")
  Comment                         = require("./models/comment.js")
  Campground                      = require("./models/campground.js"),
  seedDb                          = require("./seeds.js");


//*=================================//
//*           Middleware            //
//*=================================//
require(`dotenv`).config();
app.set(`view engine`, "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSession({
  secret:"gduqwhe8wjoqhwe8932h4euqgr89732g8435b34h58i9025",
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//*=================================//
//*           Database              //
//*=================================//
mongoose.connect( process.env.MONGO_URI , {useNewUrlParser: true , useUnifiedTopology: true },(err)=>{
  if(!err){
    console.log("Database connected successfully")
  } else (
    console.log(err)
  )
});




seedDb();


//*=================================//
//*           Root route            //
//*=================================//
app.get(`/`, function(req, res) {
  res.render(`landing`);
});


//*=================================//
//*          Index route            //
//*=================================//
app.get("/campgrounds", function(req, res) {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campground: campgrounds });
    }
  });
});

// *=================================//
// *        Register Route           //
// *=================================//
app.get("/register",(req,res)=>{
  res.render("register")
})

app.post("/register",(req,res)=>{
  passport.authenticate()
})


// *=================================//
// *           Login Route           //
// *=================================//
app.get("/login",(req,res)=>{
  res.render("login")
})

app.post("/login",(req,res)=>{
  passport.authenticate()
})


//*=================================//
//*            New route            //
//*=================================//
app.get(`/campgrounds/new`, function(req, res) {
  res.render("campgrounds/new");
});


//*=================================//
//*            Create route         //
//*=================================//
app.post(`/campgrounds`, function (req, res) {
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
app.get("/campgrounds/:id", function(req, res) {
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
app.get("/campgrounds/:id/edit", function(req, res) {
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
app.put("/campgrounds/:id", function(req, res) {
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
app.delete("/campgrounds/:id", function(req, res) {
  Campground.findByIdAndDelete({ _id: req.params.id }, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});


//*=================================//
//*         Comment Routes          //
//*=================================//
app.get("/campgrounds/:id/comments/new",(req,res)=>{
  Campground.findById(req.params.id, (err,campground)=>{
    if (err) {
      console.log(err)
    } else {
      res.render("comments/new", {campground:campground})
    }
  })
});




app.post("/campgrounds/:id/comments",(req,res)=>{
  Campground.findById(req.params.id,(err,campground)=>{
    if(err){
    console.log(err);
    res.redirect("/campgrounds/"+req.params.id)
    }else{
      console.log(campground)  
      Comment.create(req.body.comment,(err,comment)=>{
        if(err){
          console.log(err);
        }else{
        console.log(comment)
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/"+campground._id)
        }
      })
      
    }
  })
});





f

//*=================================//
//*       listen for client         //
//*=================================//
var port = process.env.PORT || 1000;

app.listen(port, function() {
  console.log("server started on port " + port);
});
