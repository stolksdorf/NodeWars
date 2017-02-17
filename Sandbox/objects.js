//Load in the needed libs
vm	= require('vm');
__	= require('./libs/underscore-min');

//Dat bot object
this.Bot = function(code, lib){
	var bot = {};

	bot.name = "";

	var context = {};
	var rawCode = code;

	var initScript;
	var coreScript;

	var getCoreScript = function(){
		if(typeof coreScript == 'undefined'){
			coreScript = vm.createScript(lib + rawCode + ";core();");
		}
		return coreScript;
	};

	var getInitScript = function(){
		if(typeof initScript == 'undefined'){
			initScript = vm.createScript(lib + rawCode+ ";init();" );
		}
		return initScript;
	};

	var runScript = function(script){
		try{
			script.runInNewContext(context);
		}catch(err){
			console.log('Error with bot ' + bot.name, err.stack);
		}
	};

	var processLogs = function(logs){
		__.each(logs, function(log){
			console.log(bot.name + ": " + log);
		});
	};

	bot.init = function(){
		runScript(getInitScript());
		//Sets the bot's name
		bot.name = context._botname;
		processLogs(context._logs);
	};

	bot.run = function(gameState){
		runScript(getCoreScript());
		processLogs(context._logs);
	};


	return bot;
};

