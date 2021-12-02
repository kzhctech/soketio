var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://kzhctech.github.io/cric/index.css">
  <link rel="stylesheet" href="https://kzhctech.github.io/cric/css/bootstrap.min.css">
  <title>Cric</title>
  <script src="https://cdn.socket.io/socket.io-3.0.0.js"></script>
  <script src="https://kzhctech.github.io/cric/index.js"></script>
</head>
<body>
	<h1>Cric</h1>
	<div class="ground">
	  <div class="cercel">
	    <div class="wicket">
	      <div id="ball"></div>
	      <div class="filder" id="f1">1</div>
	      <div class="filder" id="f2">2</div>
	      <div class="filder" id="f3">3</div>
	      <div class="filder" id="f4">4</div>
	      <div class="filder" id="f5">5</div>
	      <div class="filder" id="f6">6</div>
	      <div class="filder" id="f7">7</div>
	      <div class="filder" id="f8">8</div>
	      <div class="filder" id="f9">9</div>
	    </div>
	  </div>
	</div>
	<button type="submit" onclick="midwiket()">Midwiket 1</button>
	<button type="submit" onclick="midwiket(4)">Midwiket 4</button>
	<button type="submit" onclick="midwiket(4)">Midwiket 6</button>
	<button type="submit" onclick="hit()">Midwiket</button>
	<table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
</body>
</html>
')
})


app.listen(process.env.PORT, function () {
  console.log('Listening on port 3000...')
})

const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) =>     {
        console.log(message);
        io.emit('message', `${socket.id.substr(0,2)} said ${message}` );   
    });
});

http.listen(process.env.PORT, () => console.log('listening on http://localhost:8080') );
