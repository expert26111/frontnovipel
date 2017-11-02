/**
 * Created by Yoana on 10/27/2017.
 */

var app = require('./app');
// var db = require('./db');

app.set('port',(process.env.PORT || 5000))

// db.connect(db.MODE_TEST, function(err) {
//     if (err) {
//         console.log('Unable to connect to MySQL.')
//         process.exit(1)
//     } else {
        // app.listen(4000, function() {
        //     console.log('app listening...')
        // })
        app.listen(app.get('port'),function(){
            console.log('Node app is running on port ',app.get('port'));
        // })
    // }
})