import DiscordJS, {Intents} from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

import { Player } from "discord-music-player";
const player = new Player(client, {
    leaveOnEmpty: false, // This options are optional.
});

client.player = player;

client.on("ready", () => {
    console.log("bot ready")
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'fork') {
		//await interaction.reply('Pong!');
        await interaction.reply("Forkbot: A Open Source discord bot.");
	}
});

client.on("messageCreate", (msg) => {
	console.log("Message")
	if (msg.content == "!fork") {
		msg.channel.send("Forkbot: An open source Discord bot.")
		msg.author.send("Hello, World")
	} 
	if (msg.content == "!rick") {
		(async() => {
			let queue = client.player.createQueue(msg.guild.id);
			await queue.join(msg.member.voice.channel);
			let song = await queue.play("https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3").catch(_ => {
				if(!guildQueue)
					queue.stop();
			});
		})();
	}
})


client.login(process.env.TOKEN)