const { RichEmbed } = require('discord.js')
const log = require('../utils/log.js')
const colors = require('../utils/colors.js')

exports.render = (req, text) => {
    const embed = new RichEmbed()
        .setColor(colors.green)
        .setDescription(`${text}`)
    req.message.channel.send(embed)
    log.view('rendering view: ok')
}