const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, Intents } = require('discord.js');
const { token } = require('./config.json');
require('discord-reply');
const fetch = require("node-fetch")


const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a)=>{
    return GatewayIntentBits[a]
  }),
});


//-------required for '/' commands---------
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});





function randomInt(min, max) {  
	return Math.floor(Math.random() * (max - min + 1) + min)
  }


//--------dad hate---------
client.on('messageCreate', (message) => {

	//da grimoire
	const responses = [
		"Shut up dad!",
		"i'm a hater",
		"You are sooo lame",
		"yeah...",
		"Seriously shut up",
		"FUCK OFF",
		"shit my dick dad",
		"nobody asked",
		"*door slam*"
	]
	  
		len = responses.length - 1;
	  const rand = randomInt(0, len) 
	  daResponse = responses[rand];

	//reply to dad id
	if(message.author == 503720029456695306){
		message.reply(daResponse);
	}
	

	//----------reply using an array-----------

	console.log('Received message:', message.content);

	const shittyGames = [
		'stray',
		'huniepop',
		'league of legends',
		'lol',
		'guild wars 2',
		'overwatch',
		'call of duty',
		'cod',
		'dead by daylight',
		'dbd',
		'brawlhalla',
		'osu',
		'pubg',
		'football manager',
		'fifa',
		'rocket league',
		'black desert online',
		'halo wars 2',
		'hearthstone',
		'fortnite',
		'fortnight',
		'omori',
		'enter the gungeon',
		'super mega baseball',
		'among us',
		'rust',
		'fallout 4',
		'skyrim',
		'half life 2',
		'realm of the mad god',
		'starbound',
		'tf2',
		'joeseph anderson',
		'60 seconds',
		'alt f4',
		'fingered',
		'fnaf',
		'telltale',
		'anthem', 
		'sm64',
		'super mario 64',
		'world of warcraft',
		'wow',
		'gta',
		'apex',
		'cyberpunk 2077',
		'new world',
		'lost ark',
		'dayz',
		'farcry',
		'gmod',
		'modded minecraft',
		'battlefield 2042',
		'arma 3',
		'smite',
		'dota 2',
		'trove',
		'stumble guys',
		'hogwarts legacy',
		'raft',
		'war robots',
		'borderlands',
		'hunt down the freeman',
		'checkers',
		'halo infinite',
		'halo 5',
		'diablo 4',
		'gollum',
		'dragon age',
		'cult of the lamb',
		'genshin impact',
		'eso',
		'elder scrolls online',
		'ghost recon',
		'maplestory',
		'backrooms',
		'redfall',
		'back 4 blood',
		'avatar the quest for balance',
		'poppy playtime',
		'hello neighbor',
		'secret neighbor',
		'yandere simulator',
		'dragon quest',
		'xenoblade',
		'gotham knights',
		'sword art online',
		'world of tanks',
		'pong',
		'turbo dismount'
	];

	currentMes = message.content.toLowerCase()

	for (const str of shittyGames) {
		if (currentMes.includes(str.toLowerCase())) {
		  message.reply("shitty game");
		  break; // Exit the loop after the first match
		}
	  }
	

	//--------reply to specific keyword----------
	const triggerWord = 'not a shitty game';

	if (message.author.bot || !message.content.toLowerCase().includes(triggerWord)) {
	  return;
	}
  
	//we do a little error handling 
	message.reply("yes it is")
	  .catch((error) => {
		console.error('Error sending reply:', error);
	  });
  });
  
  client.on('error', (error) => {
	console.error('Bot encountered an error:', error);
  });






//authenticate
client.login(token);

