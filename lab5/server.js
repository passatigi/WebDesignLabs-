const http = require("http");
const fs = require('fs');
const path = require('path');

let duckText
fs.readFile("./duck.txt", "utf8", (err, data) =>{
	if(err){
		console.log(err.code);
	}
	else{

		duckText = data.toString();
		console.log(duckText);
	}
});

const WhiteToFile = (path, text) => {
	fs.writeFile(path, text, (err) =>{
		if(err){
			console.log(err.code);
		}
	});
}

http.createServer(function(request,response){
	console.log(request.url)
	if(request.url == "/stats/add" ){
		request.on('data', (data) => {
		fs.readFile("./players.json", "utf8", (err, filedata) =>{
			if(err){
				console.log(err.code);
			}
			else{
				let newPlayer = JSON.parse(data);
				newPlayer.try_id = 1;
				console.log("end taken");
				console.log(newPlayer);
				let personArr;
				if(filedata.toString() == ""){
					personArr = new Array();
					newPlayer.try_id = 1;
					personArr.push(newPlayer);
					console.log("first elem inserted");
				}
				else{
					personArr = JSON.parse(filedata.toString());
					newPlayer.try_id = personArr.length + 1;
					personArr.push(newPlayer);
					console.log("players taken and inserted");
				}
				let playersJson = (JSON.stringify(personArr)).toString();
				WhiteToFile("./players.json", playersJson);
				response.writeHead(200, { 'Content-Type': 'application.json', 'Access-Control-Allow-Origin': '*' });
				response.end();
			}
		});})
	}
	else if(request.url == "/stats" ){
			fs.readFile("./players.json", "utf8", (err, filedata) =>{
				if(err){
					console.log(err.code);
				}
				else{
			
					let players = filedata.toString();
					console.log("players taken");
					response.writeHead(200, { 'Content-Type': 'application.json', 'Access-Control-Allow-Origin': '*' });
					response.end(players);
				}
			});
	}
	else{ 
		request.on('data', (data) => {
            console.log('otdai');
				response.writeHead(200, { 'Content-Type': 'application.html', 'Access-Control-Allow-Origin': '*' });
				if(data.toString() === duckText){
					response.end("done");
				}
				else{
				setTimeout(
					() => {
						response.end(duckText.indexOf(data.toString()).toString());
					}, 1000
				);
				}
				
			})
	}
	console.log('zdes');
}).listen(3000);
console.log('server start working');
