
var mongoose = require('mongoose');
//Set up default mongoose connection
require(`dotenv`).config();
var Campground = require("./models/campground.js")
var Comment = require("./models/comment.js")

 //Get the default connection
 
 var campgrounds = [
  {
    name: "White Water Creek ",
    image: "https://farm7.staticflickr.com/6193/6108828094_efc27cbbed.jpg",
    description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Camp Bestival ",
    image: "https://farm2.staticflickr.com/1291/4677961495_2c1ce8c73a.jpg",
    description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Starry Camp",
    image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
    description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Occoneechee State Park ",
    image: "https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg",
    description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Scout Camp 2012",
    image: "https://farm9.staticflickr.com/8300/7930013108_cd3e432ba5.jpg",
    description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Wye Valley Camping ",
    image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg",
    description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "cougar photobomb",
    image: "https://farm8.staticflickr.com/7145/6566058859_66be51c243.jpg",
    description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Morning TEMP has broken",
    image: "https://farm7.staticflickr.com/6103/6333668591_90e7c2bc72.jpg",
    description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];


 function seedDB(){
  Campground.deleteMany({},(err)=>{
    if(err){
      console.log(err);
    }else{
      campgrounds.forEach((data) =>   
        Campground.create(data,(err,camp)=>{
          if(err){
            console.log(err);
          } else {
            Comment.deleteMany({},(err)=>{
              if(err){
                console.log(err);
              }else{
                console.log("comment deleted")
                Comment.create({ 
                  text : "great place with stars all over",
                  author :  "pradeep" 
                },(err,comment) =>{
                  if(err){ 
                    console.log(err);
                  } else {
                    console.log("addecd comment");
                    camp.comments.push(comment)  
                    camp.save();
                  } 
                });
              }
            });
          }
        })
      );
    }
  });

}

//Bind connection to error event (to get notification of connection errors)
module.exports = seedDB











