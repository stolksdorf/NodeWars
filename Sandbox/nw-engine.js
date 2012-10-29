
var fileIO	= require('fs'),
	Obj 	= require('./objects'),
	__		= require('./libs/underscore-min');

var bots = [];

//Get default nw-lib
fileIO.readFile('./libs/nw-lib.js', 'utf8', function(err, data) {
	if (err) throw err;
	loadBots(data);
});


var loadBots = function(nw_lib){
	var dir = './bots/';
	//Loop through the bot directory
	fileIO.readdir(dir, function(err,files){
		if (err) throw err;
		var c=0;
		files.forEach(function(fileName){
			c++;
			fileIO.readFile(dir + fileName,'utf-8',function(err,botCode){
				if (err) throw err;

				//Create new bot from code
				bots.push(new Obj.Bot(botCode, nw_lib));
				if (0===--c) {
					//Once all are loaded, run inti on them
					initBots();
				}
			});
		});
	});
};

var initBots = function(){
	bots.forEach(function(bot){
		bot.init();
	});
	runBots();
};

//Every 2 seconds, run the bots
var runBots = function(){
	setInterval(function(){
		console.log("-------");
		bots.forEach(function(bot){
			bot.run();
		});

	}, 2000);
};


