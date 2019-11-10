var express =  require('express');
var request =  require('request');
var fs = require('fs')

var app = express();
app.use(express.static('static'));

app.get("/read",function(req,res){

    request.get('http://localhost:8081/file1.json', function (error, response, body) {
    if (!error && response.statusCode == 200) {
    
       var pdfLinks = body.match(/(https:\/\/).+\.(([pP][dD][fF]))/gim); // this filters all pdf links   (g - global , i - case insensitive , m - multiline)

       //putting the results it in a file
       console.log(pdfLinks)
       fs.writeFile("results.txt", pdfLinks, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
        });
    }
});
})

//I just put the file you gave with json extension inside static folder, it can be anywere else
app.get('/file1.json',function(req,res){

	 res.sendFile( __dirname + "/" + "file1.json" );
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})