var mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect( process.env.MONGO_URI , {useNewUrlParser: true , useUnifiedTopology: true },(err)=>{
  if(!err){
    console.log("Database connected successfully")
  } else (
    console.log(err)
  )
});

var userSchema = new mongoose.Schema({
  email: String,
  name: String
});

var User = mongoose.model("User", userSchema);
var newuser = new User({
  email: "iasdassssds@speech.com",
  name: "asdasdadasdasd"
});
newuser.save(function(err, user) {
  if (err) {
    console.log(err);
  } else {
    console.log(user);
  }
});
