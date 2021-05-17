const http = require("http");
const fs = require('fs');
const path = require('path');
http.createServer(function(request,response){
	request.on('data', (data) => {
		if(data == 'gettime'){
			
			response.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
				let currentDate = new Date();
				response.end(currentDate.toLocaleTimeString());

		}
		if(data == 'gettext'){
			fs.readFile(path.join(__dirname, 'public', "filelab2.txt"), (err, data) =>{
				if(err){
					response.statusCode = 404;
					response.end("File not found");data
				}
				else{
					response.writeHead(200, { 'Content-Type': 'application.txt', 'Access-Control-Allow-Origin': '*' });
					setTimeout(() => {
						response.end(data);
					}, 5000);
				}
			})
			
		}
	});
}).listen(3000);
