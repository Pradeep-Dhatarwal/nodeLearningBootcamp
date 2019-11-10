var mongoose = require("mongoose");
mongoose.connect("http://localhost/dbdemo", { useNewUrlParser: true });

var userSchema = new mongoose.Schema({
  email: String,
  name: String
});

var User = mongoose.model("User", userSchema);
var newuser = new User({
  email: "iasdasds@speech.com",
  name: "asdasdadasdasd"
});
newuser.save(function(err, user) {
  if (err) {
    console.log(err);
  } else {
    console.log(user);
  }
});
