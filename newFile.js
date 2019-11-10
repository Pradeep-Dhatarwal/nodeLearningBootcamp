const { app, Campground } = require("./app");
app.delete("/campgrounds/:id", function(req, res) {
    Campground.findByIdAndDelete({ _id: req.params.id }, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});
