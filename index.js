require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const Discord = require('discord.js');
const client = new Discord.Client();
const { parse } = require('discord-command-parser');
const captureWebsite = require('capture-website');
const fs = require('fs');
const generateParams = require('./generate-params');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  const parsed = parse(msg, '?');
  // User isn't trying to invoke the bot, leave it
  if(!parsed.success) return;
  if (parsed.command === process.env.COMMAND || 'yahoo') {
    const id = uuidv4();
    const symbols = parsed.reader.getString().split(',');
    const firstSymbol = symbols[0];
    msg.channel.send('Working on it...');
    try {
      await captureWebsite.file(`https://finance.yahoo.com/quote/${firstSymbol}/chart?p=${firstSymbol}#${generateParams({ symbols })}`,
        `./shots/${id}.png`,
        {
          hideElements: [
            '#YDC-UH',
            '#mrt-node-Col1-7-Footer'
          ],
          fullPage: true,
          //scrollToElement: '.qsp-watchlist-add',
          emulateDevice: 'iPad',
          element: '.stx-panel-chart',
          timeout: 20,
        });
      await msg.channel.send('Here you go!', {
        files: [`./shots/${id}.png`]
      });
      fs.unlink(`./shots/${id}.png`, (err) => {
        if(err) console.error(err);
      });
    } catch (err) {
      console.error(err);
      msg.channel.send(`Seems invalid...${firstSymbol}?`);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
