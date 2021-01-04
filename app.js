var http = require('http');
var fs = require('fs');
var url = require('url');



//read and parse the adress, split the query string into readable parts and put each person´s details on a separate line

function printToFile( adr, res, req) {
    
    var q = url.parse(adr, true);    
    if (q.pathname == "/submitted") {
        var txt = "Namn: " + q.query.pname + " Telefonnummer: " + q.query.telefon; 
        fs.appendFile('highScoreboard.txt', txt + "\r\n",  function (err) {
            if (err) throw err;           
            console.log('Updated!');           
        });                                       
    }              
}
    //create server, by default open the html forms to input name and number

http.createServer(function (req, res) {
    fs.readFile('toForm.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });        
        res.write(data);
        printToFile(req.url, res); 
        //read the txt file containing the information and print it out below the html form without losing it´s formating due to the pre tag
        fs.readFile('./highscoreboard.txt', 'utf8', function (error, log) {

            var textOut = log;
            res.write("         <pre>" + textOut + "</pre> ");
            res.end();


        }); 
                                                                 
    });
       
}).listen(8080);
