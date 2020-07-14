
// *=================================//
// *           Packages              //

const campground = require("./models/campground.js");

// *=================================//
const express       = require(`express`),
  app               = express(),
  bodyParser        = require(`body-parser`),
  methodOverride    = require("method-override"),
  mongoose          = require(`mongoose`),
  Campground        = require("./models/campground.js"),
  seedDb            = require("./seeds.js");
  

//*=================================//
//*           Middleware            //
//*=================================//
require(`dotenv`).config();
app.set(`view engine`, "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


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
            console.log(campgrounds);
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
        Campground.comment.push(comment);
        Campground.save();
        res.redirect("/campgrounds/"+req.params.id)
        }
      })
      
    }
  })

});







//*=================================//
//*       listen for client         //
//*=================================//
var port = process.env.PORT || 1000;

app.listen(port, function() {
  console.log("server started on port " + port);
});
