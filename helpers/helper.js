function isLoggedin(req,res,next){
  if(User.authenticated()){
    return next();
  } else {
    res.redirect("/")
  }
}

module.exports = isLoggedin