require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const Discord = require('discord.js');
const client = new Discord.Client();
const { parse } = require('discord-command-parser');
const captureWebsite = require('capture-website');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  const parsed = parse(msg, '?');
  // User isn't trying to invoke the bot, leave it
  if(!parsed.success) return;
  if (parsed.command === 'yahoo') {
    const id = uuidv4();
    const symbol = parsed.reader.getString();
    try {
      await captureWebsite.file(`https://finance.yahoo.com/quote/${symbol}/chart?p=${symbol}`,
        `./shots/${id}.png`,
        {
          hideElements: [
            '#YDC-UH',
            '#mrt-node-Col1-7-Footer'
          ],
          scrollToElement: '.qsp-watchlist-add',
          emulateDevice: 'iPhone X',
        });
      msg.channel.send('Here you go!', {
        files: [`./shots/${id}.png`]
      });
    } catch (e) {
      msg.channel.send('Seems invalid...');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
