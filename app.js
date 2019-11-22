const express = require('express');
const path = require('path');
const sudoku = require('sudoku');
const app = express();
const bodyParser = require('body-parser');
const _ = require('underscore');
const port = 8081;
const arr = [];
var s = [], sel = [], x = [];
var exports = module.exports = {};
var server = null;

function makeArray(length, value) {
	return _.map(_.range(length), function(val, key) {
		return value;
	})
}

for (var i = 0; i < 81; i++) arr.push(null);

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json()); 

app.get('/sudoku/board', (req, res) => {
	
	let e = true;
	let xx = 0;
	
	if (sel.length == 0) 
		s = sudoku.solvepuzzle(arr);
	else {
		for (let i = 0; i < sel.length; i++) 
			x.push({
				p: sel[i], 
				n: s[sel[i]]
			});

		while (true) {
			s = sudoku.solvepuzzle(makeArray(81, null));
			for (xx of x) {
				if (s[xx.p] == xx.n) {
					e = true;
				}  
				else {
					e = false;
					break;
				}
			}

			if (e) break;
		}

		sel = [];
		x = [];
	}
	
	res.send(JSON.stringify(s));
});

app.get('/sudoku/close', (req, res) => {

	res.send("Closing the server");
	server.close();
});

app.post('/sudoku/select', (req, res) => {

	sel = req.body;
	res.send({ status: 'SUCCESS' }).status(200);
});

app.get('*', (req, res) => {
	
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

server = app.listen(port, () => console.log(`Sudoku API listening on port ${port}!`));

exports.closeServer = function () {

	server.close();
};
