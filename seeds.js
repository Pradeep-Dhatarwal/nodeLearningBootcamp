
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
    description :"lorem ipsum dolor sem emet"
  },
  {
    name: "Camp Bestival ",
    image: "https://farm2.staticflickr.com/1291/4677961495_2c1ce8c73a.jpg",
    description :"lorem ipsum dolor sem emet"
  },
  {
    name: "Starry Camp",
    image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
    description :"lorem ipsum dolor sem emet"
  },
  {
    name: "Occoneechee State Park ",
    image: "https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg",
    description :"lorem ipsum dolor sem emet"
  },
  {
    name: "Scout Camp 2012",
    image: "https://farm9.staticflickr.com/8300/7930013108_cd3e432ba5.jpg",
    description :"lorem ipsum dolor sem emet"
  },
  {
    name: "Wye Valley Camping ",
    image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg",
    description :"lorem ipsum dolor sem emet"
  },
  {
    name: "cougar photobomb",
    image: "https://farm8.staticflickr.com/7145/6566058859_66be51c243.jpg",
    description :"lorem ipsum dolor sem emet"
  },
  {
    name: "Morning TEMP has broken",
    image: "https://farm7.staticflickr.com/6103/6333668591_90e7c2bc72.jpg",
    description :"lorem ipsum dolor sem emet"
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
            console.log(camp);
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











