const http = require("http");
const fs = require('fs');
const path = require('path');


http.createServer(function(request,response){
        if(request.url === "/?veipn1/" ){
            console.log('otdai');

            fs.readFile("./texts/firsttext.html", (err, data) =>{
				if(err){
					response.statusCode = 404;
					response.end("File not found");
				}
				else{
					response.writeHead(200, { 'Content-Type': 'application.html', 'Access-Control-Allow-Origin': '*' });
					response.end(data);
				}
			});
        }
        else if(request.url.startsWith("/veip_photo/")){
            fs.readFile("./texts/aboutveip.json", (err, data) =>{
				if(err){
					response.statusCode = 404;
					response.end("File not found");
				}
				else{
					response.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
					response.end(data);
				}
			});
        }
		else if(request.url.startsWith("/pozvony")){
			request.on('data', data => {
				console.log(data.toString());
				response.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
				response.end('ok');
			});
		}
}).listen(3000);
console.log('server start working');
