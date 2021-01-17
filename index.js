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
    msg.channel.send('Working on it...');
    try {
      await captureWebsite.file(`https://finance.yahoo.com/quote/${symbol}/chart?p=${symbol}`,
        `./shots/${id}.png`,
        {
          // beforeScreenshot: async (page, browser) => {
          //   page.addStyleTag({
          //     content: `
          //
          //     `
          //   })
          // },
          hideElements: [
            '#YDC-UH',
            '#mrt-node-Col1-7-Footer'
          ],
          fullPage: true,
          //scrollToElement: '.qsp-watchlist-add',
          emulateDevice: 'iPad',
          element: '.stx-panel-chart',
          timeout: 10,
        });
      msg.channel.send('Here you go!', {
        files: [`./shots/${id}.png`]
      });
    } catch (e) {
      console.log(e);
      msg.channel.send(`Seems invalid...${symbol}?`);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
