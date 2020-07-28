
// *=================================//
// *           Packages              //
// *=================================//
const express                     = require(`express`),
  app                             = express(),
  expressSession                  = require("express-session")
  bodyParser                      = require(`body-parser`),
  methodOverride                  = require("method-override"),
  mongoose                        = require("mongoose"),
  passport                        = require("passport"),
  localStrategy                   = require("passport-local"),
  passportLocalMongoose           = require("passport-local-mongoose"),
  User                            = require("./models/users.js"),
  Comment                         = require("./models/comment.js"),
  Campground                      = require("./models/campground.js"),
  seedDb                          = require("./seeds.js");

//*=================================//
//*             routes              //
//*=================================//

const commentRoutes               = require("./routes/comments.js"),
campgroundRoutes               = require("./routes/campgrounds.js"),
authRoutes               = require("./routes/index.js");


//*=================================//
//*           Middleware            //
//*=================================//
require(`dotenv`).config();
app.set(`view engine`, "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


//*=================================//
//*        Configure Passport       //
//*=================================//
app.use(expressSession({
secret:"gduqwhe8wjoqhwe8932h4euqgr89732g84qwrewrscbcnmlkjhgfdsapoiuytrewwq35b34h58i9025",
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
  res.locals.currentUser = req.user;
  next();
})


//*=================================//
//*      Configure Database         //
//*=================================//
mongoose.connect( process.env.MONGO_URI , {useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify : false },(err)=>{
  if(!err){
    console.log("Database connected successfully")
  } else (
    console.log(err)
  )
});
seedDb();




//*=================================//
//*           Routes                //
//*=================================//
app.use(authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);





//*=================================//
//*       listen for client         //
//*=================================//
var port = process.env.PORT || 1000;

app.listen(port, function() {
  console.log("server started on port " + port);
});
