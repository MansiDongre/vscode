var express = require('express');
var router = express.Router();
var fs = require("fs")
/* GET home page. */




router.get('/', function(req, res, next) {
  var filesdup=[ ];

fs.readdir("./uploads",{withFileTypes:true},function(err,files){

   files.forEach(function(dirent){

     filesdup.push({name:dirent.name,isFolder:dirent.isDirectory()})

   })

    res.render('index', { files:filesdup});
});
});


router.get('/filename', function(req, res, next) {
  fs.writeFile(`./uploads/${req.query.file}` , "  ", function(err){
    if(err){
      console.log(err)
    }else{
      res.redirect("/")
    }
  })

});

router.get('/foldername', function(req, res) {
  fs.mkdir(`./uploads/${req.query.folder}` , function(err){
        if(err){
          console.log(err)
        }else{
          res.redirect("/")
        }
  })

});


// router.get('/file/:filename', function(req, res) {
//   var filename= req.params.filename
//   console.log(filename)
//   fs.readFile(`./uploads/${filename}` , "utf8", function(err,data){
//       //  console.log(data)
//        res.render("abt",{data});
    
//   })

// });
router.get('/file/:filename', function(req, res) {
  var filesdup=[ ];

  fs.readdir("./uploads",{withFileTypes:true},function(err,files){
  
     files.forEach(function(dirent){
  
       filesdup.push({name:dirent.name,isFolder:dirent.isDirectory()})
  
     })
  fs.readFile(`./uploads/${req.params.filename }`,"utf8",function(err,data){
    res.render('abt', { files:filesdup , filename : req.params.filename , filedata : data })

      
  });
})
});
router.get(`/deletefile/:filename`,function(req,res){
  fs.unlink(`./uploads/${req.params.filename}`,function(err){
    if(err){
      console.log(err)
    }else{
      res.redirect("/")
    }
  })
  fs.rmdir(`./uploads/${req.params.filename}`,function(err){
    if(err){
      console.log(err)
    }else{
      res.redirect("/")
    }
  })
})





module.exports = router;
