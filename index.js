require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const Discord = require('discord.js');
const client = new Discord.Client();
const { parse } = require('discord-command-parser');
const captureWebsite = require('capture-website');
const fs = require('fs');
const tiny = require('tinyurl');
const generateParams = require('./generate-params');
const allowedPeriods = generateParams.allowedPeriods;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  const parsed = parse(msg, '?');
  // User isn't trying to invoke the bot, leave it
  if(!parsed.success) return;
  if(parsed.command === (process.env.COMMAND || 'yahoo')) {
    const id = uuidv4();
    const symbols = parsed.reader.getString().split(',');
    const firstSymbol = symbols[0];
    const period = parsed.reader.getString(false);
    msg.channel.send(`Working...${period && !allowedPeriods.includes(period) ? `with invalid period (${allowedPeriods.join(',')})` : ''}`);
    const generatedUrl = `https://finance.yahoo.com/quote/${firstSymbol}/chart?p=${firstSymbol}#${generateParams({ symbols, period })}`;
    try {
      await captureWebsite.file(generatedUrl,
        `./shots/${id}.png`,
        {
          hideElements: [
            '#YDC-UH',
            '#YDC-Nav',
            '#mrt-node-Col1-7-Footer',
            '.stx_chart_controls',
            '.stx_jump_today',
          ],
          fullPage: true,
          scrollToElement: '.stx-panel-chart',
          //delay: 1,
          //emulateDevice: 'iPad',
          element: '.stx-panel-chart',
          timeout: 20,
        });
      await msg.channel.send('Here you go', {
        files: [`./shots/${id}.png`]
      });
      tiny.shorten(generatedUrl, (res, err) => {
        if (err) {
          console.log(err);
        } else {
          msg.channel.send(`<${res}>`);
        }
      })
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
