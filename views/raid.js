const { RichEmbed } = require('discord.js')
const moment = require('moment')
const log = require('../utils/log.js')
const cast = require('../utils/cast.js')
const colors = require('../utils/colors.js')

exports.render = (req, raid) => {
    let enteredby = isNaN(raid.enteredby) == true ? raid.enteredby : cast.user(raid.enteredby)
    let users = raid.users.map(user => {
        return isNaN(user) == true ? user : cast.user(user)
    })
    let loots = raid.loots.map(loot => {
        let user = isNaN(loot.user) == true ? loot.user : cast.user(loot.user)
        let item = loot.alt == true ? `${cast.role(loot.item)} (alt)` : cast.role(loot.item)
        return `\n${loot.id} ${user} ${item}`
    })
    const embed = new RichEmbed()
        .setColor(colors.lightblue)
        .setDescription(`**raid: ${cast.channel(raid.event)}**\n` +
            `id: ${raid.id}\n` +
            `date: ${moment(raid.date).format('YYYY-MM-DD')}\n` +
            `time: ${moment(raid.date).format('HH:mm')} CST\n` +
            `entered by: ${enteredby}\n` +
            `value: ${raid.value}\n` +
            `users: ${users}\n` +
            `loots: ${loots}`
        )
    //.setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ38zarDr_qM48Qo_T9-C1OxHJ5MAkFfY18Aiy3-wz7i6qnACY1")
    req.message.channel.send(embed)
    log.view('rendering view: raid')
}