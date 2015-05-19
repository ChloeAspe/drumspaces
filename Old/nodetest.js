var http = require('http');
var url = require("url");

var server = http.createServer(function(req, res) {
var page= url.parse(req.url).pathname;
console.log(page);
res.writeHead(200, {"Content-Type": "text/html"});
if(page == "/") {
	res.write('<p>page daccueil</p>');
} else {
	res.write('<p>autrepage: '+page+'</p>');

}
res.end();
});

server.listen(8080);