const Discord = require("discord.js")
const botconfig =  require("../botconfig")

let purple = botconfig.purple
let xp = require("../xp.json")

module.exports.run = async (bot, message, args) => {


    if(!xp[message.author.id]) {
        xp[message.author.id] = {
            xp:0, 
            level:1
        }
    }
    let curxp = xp[message.author.id].xp
    let curlvl = xp[message.author.id].level
    let nxtlvlxp = curlvl * 300
    let difference = nxtlvlxp - curxp

    let lvlEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.id)
    .setColor(purple)
    .addField("Level", curlvl, true)
    .addField("XP", curxp, true)
    .setFooter(`${difference} Осталось XP до след. уровня.` , message.author.displayAvatarURL)

    message.channel.send(lvlEmbed).then(msg => {msg.delete(5000)})
}

module.exports.help = {
    name: "level"
}