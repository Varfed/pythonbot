const config = require('./config.json')
const Discord = require('discord.js')
const bot = new Discord.Client({ disableEveryone: true})
const strftime = require('strftime')
const ms = require('ms')
let xp = require("./xp.json");

bot.on("ready", () => {
    bot.user.setPresence({
        game: { 
            name: 'Discord.js',
            type: 'PLAYING'
        },
        status: "online"
    })
    console.log("Бот онлайн!")
  });


  bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  
  
    let xpAdd = Math.floor(Math.random() * 7) + 8;
    console.log(xpAdd);
  
    if(!xp[message.author.id]){
      xp[message.author.id] = {
        xp: 0,
        level: 1
      };
    }
  
  
    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl = xp[message.author.id].level * 300;
    xp[message.author.id].xp =  curxp + xpAdd;
    if(nxtLvl <= xp[message.author.id].xp){
      xp[message.author.id].level = curlvl + 1;
      let lvlup = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setColor(purple)
      .addField("New Level", curlvl + 1);
  
      message.channel.send(lvlup).then(msg => {msg.delete(5000)});
    }
    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
      if(err) console.log(err)
    });

    if(curlvl === "3"){
        let member = xp[message.author.id]
        let gRole = message.guild.roles.find(`id`, '');
        member.addRole(gRole)
    }

    if(curlvl=== "7")

    let prefix = config.prefix
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
  
  
  });
  

bot.login(config.token)