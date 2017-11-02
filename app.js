/**
 * Created by Yoana on 9/12/2017.
 */
var express = require('express');
// var db = require('./db');
 var app = express();
// var app = module.exports = express();
// var db = require('./db');
// var router = require('./routes/stories');
// var routerAuthenticate = require('./routes/authenticate');
var cors = require('cors');
// var config = require('./config');
// var port = process.env.PORT || 3000
//  app.set('superSecret', config.secret); // secret variabl

 app.use(cors());
 // app.use('/stories',router);
 // app.use('/authenticate', routerAuthenticate);
 app.use(express.static('./public'));

// app.get('http://e84c4736.ngrok.io/stories',function(req,res){
//
//
//             db_stories.getAll(function(err, stories){
//                 if(err)
//                 {
//                     response.status(500).json("Internal Server Error");
//                 }else
//                 {
//                     //console.log("THE STORIES ARE ",stories);
//                     response.status(200).json(stories);
//                 }
//             })
//
//
//             });

 module.exports = app;


// db.connect(db.MODE_TEST, function(err) {
//     if (err) {
//         console.log('Unable to connect to MySQL.')
//         process.exit(1)
//     } else {
//         app.listen(4000, function() {
//             console.log('app listening...')
//         })
//     }
// })

// app.listen(port, function() {
//             console.log('app listening...')
//         })
