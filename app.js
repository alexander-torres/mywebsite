let express = require('express');
let app = express();
let http = require('http');
let server = http.createServer(app);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

/* ---------- Routes ---------- */
app.get('/', function(req, res){
    res.render('index');
});

app.get('/projects/colorgame', function(req, res){
    res.render('projects/colorgame');
});

app.get('/projects/pixelartmaker', function(req, res){
    res.render('projects/pixelartmaker');
});

app.get('/projects/sokoban', function(req, res){
    res.render('projects/sokoban');
});

app.get('/projects/tictactoe', function(req, res){
    res.render('projects/tictactoe');
});

app.get('*', function(req, res){
	res.send('Could not find the requested page');
});

/* ---------- Server ---------- */
server.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function(){
    let addr = server.address();
    console.log("Chat server listening at", addr.address + ":" + addr.port);
});