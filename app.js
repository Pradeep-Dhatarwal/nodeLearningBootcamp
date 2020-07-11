const express       = require(`express`),
  app               = express(),
  bodyParser        = require(`body-parser`),
  methodOverride    = require("method-override"),
  mongoose          = require(`mongoose`),
  Campground        = require("./models/campground.js"),
  seedDb            = require("./seeds.js");
  
require(`dotenv`).config();
app.set(`view engine`, "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
mongoose.connect( process.env.MONGO_URI , {useNewUrlParser: true , useUnifiedTopology: true },(err)=>{
  if(!err){
    console.log("Database connected successfully")
  } else (
    console.log(err)
  )
});
var port = process.env.PORT || 1000;
seedDb();

// Root Route
app.get(`/`, function(req, res) {
  res.render(`landing`);
});
// Index Route
app.get("/campgrounds", function(req, res) {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campground: campgrounds });
    }
  });
});

//New Route
app.get(`/campgrounds/new`, function(req, res) {
  res.render("new");
});
// Create Route
app.post(`/campgrounds`, function (req, res) {
      if(req.body.campground.image ==""|| req.body.campground.name =="" || req.body.campground.description ==""){
        res.render("new");
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

//Show Route
app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec((err, CampgroundDetails) => {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { campground: CampgroundDetails });
    }
  });
});

// Edit Route
app.get("/campgrounds/:id/edit", function(req, res) {
  Campground.findById({ _id: req.params.id }, function(
    err,
    editCampgroundDetails
  ) {
    if (err) {
      console.log(err);
    } else {
      res.render("edit", { campground: editCampgroundDetails });
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









//*=================================//
//*       listen for client         //
//*=================================//

//
app.listen(port, function() {
  console.log("server started on port " + port);
});
