var express = require(`express`),
  app = express(),
  bodyParser = require(`body-parser`),
  methodOverride = require("method-override"),
  mongoose = require(`mongoose`);

app.set(`view engine`, "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongoose.connect(`mongodb://localhost/yelp_Camp`, { useNewUrlParser: true });
var port = process.env.PORT || 1000;
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create(
//   {
//     name: "White Water Creek ",
//     image: "https://farm7.staticflickr.com/6193/6108828094_efc27cbbed.jpg",
//     description:
//       "This is a Creek Full of Gold, Bring Your Digging tools or else Freeze in cold!!!!"
//   },
//   function(err, campgrounds) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(campgrounds);
//     }
//   }
// );
// var campgrounds = [
//   {
//     name: "White Water Creek ",
//     image: "https://farm7.staticflickr.com/6193/6108828094_efc27cbbed.jpg"
//   },
//   {
//     name: "Camp Bestival ",
//     image: "https://farm2.staticflickr.com/1291/4677961495_2c1ce8c73a.jpg"
//   },
//   {
//     name: "Starry Camp",
//     image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"
//   },
//   {
//     name: "Occoneechee State Park ",
//     image: "https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg"
//   },
//   {
//     name: "Scout Camp 2012",
//     image: "https://farm9.staticflickr.com/8300/7930013108_cd3e432ba5.jpg"
//   },
//   {
//     name: "Wye Valley Camping ",
//     image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg"
//   },
//   {
//     name: "cougar photobomb",
//     image: "https://farm8.staticflickr.com/7145/6566058859_66be51c243.jpg"
//   },
//   {
//     name: "Morning TEMPhas broken",
//     image: "https://farm7.staticflickr.com/6103/6333668591_90e7c2bc72.jpg"
//   }
// ];

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
    if (req.body.campground == null) {
        Campground.create(req.body.campground, function (err, campgrounds) {
            if (err) {
                console.log(err);
            } else {
                console.log("Data added Succesfully");
                console.log(campgrounds);
                res.redirect(`/campgrounds`);
            }
        });
    } else {
        res.render("new");
    }
  
});

//Show Route
app.get("/campgrounds/:id", function(req, res) {
  Campground.findById({ _id: req.params.id }, function(err, CampgroundDetails) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { campground: CampgroundDetails });
    }
  });
});
// EDit Route
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
//put route
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
//listen for client
app.listen(port, function() {
  console.log("server started on port " + port);
});
