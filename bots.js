const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
 client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`in ${client.guilds.size} servers `)
    console.log(`[Users] ${client.users.size}`)
	console.log(`Hi`)
    client.user.setStatus("Hi")
});

let points = JSON.parse(fs.readFileSync('./3lm/3lmPTS.json', 'utf8'));
var prefix = "!#";////هنا تحط البرفكس اللي تبيه

client.on('message', message => {
if (!points[message.author.id]) points[message.author.id] = {
    points: 0,
  };
if (message.content.startsWith(prefix + '3lm')) { //هنا امر اللعبه تقدر تغيره 
    if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));

const type = require('./3lm/3lm.json');
const item = type[Math.floor(Math.random() * type.length)];
const filter = response => {
    return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};
message.channel.send('**لديك 15 ثانيه لتعرف علم اي دولة**').then(msg => { ////هادي الرساله اللي يكتبها يقوله لديك 15 ثانيه تبي تعدلها  علي راحتك

msg.channel.sendFile(`${item.images}`).then(() => {
        message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
        .then((collected) => {
        message.channel.send(`${collected.first().author} ✅ **كفوو والله اجابتك صحيحه**`); 
        console.log(`[Typing] ${collected.first().author} typed the word.`);////هنا بيكتبلك في الكونسل ايدي الشخص اللي كتب الاجابه صحيحه
            let userData = points[message.author.id];
            userData.points++;
          })
          .catch(collected => {
            message.channel.send(`**تم الانتهاء من الوقت  حظ اوفر المره القادمه :stopwatch: الاجابه هي : __${item.answers}__ **`); 
            console.log('[Typing] Error: No one type the word.');
          })
        })
    })
}
});

client.on('message', message => {
if (message.content.startsWith(prefix + 'points')) {//هنا امر النقاط اذا تبي تغيره غير
    if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));
    let userData = points[message.author.id];
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
    .setColor('#000000')
    .setDescription(`نقاطك: \`${userData.points}\``)
    message.channel.sendEmbed(embed)
  }
  fs.writeFile("./3lm/3lmPTS.json", JSON.stringify(points), (err) => {
    if (err) console.error(err)
  })
});

client.login("NjE3ODUxMTQ0MDg5MzcwNjI2.XkpWuw.bs8l_QKH4O5VQ7QI__V1ClNHE5o");


