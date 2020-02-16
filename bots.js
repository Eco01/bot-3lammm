/*

حقوق النشر ل بارون 

Baron >> https://baron.netlify.com/

*/
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
var prefix = "*";////هنا تحط البرفكس اللي تبيه
//// Reverse#0505
////الكود متعوب عليه الف 

client.on('message', message => {
if (!points[message.author.id]) points[message.author.id] = {
    points: 0,
  };
if (message.content.startsWith(prefix + 'علم')) { ////هنا الامر اللي بتكتبه ويعطيك الصوره والكلام بس الامر لازم تحط معه البرفكس اللي بتحطه فوق
    if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));////هنا الرساله ذي اذا احد دخل الخاص حق البوت وسوي *لاعب يقوله ما ينفع بس في السيرفرات

const type = require('./3lm/3lm.json');
const item = type[Math.floor(Math.random() * type.length)];
const filter = response => {
    return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};
message.channel.send('**لديك 15 ثانيه لتعرف علم اي دولة**').then(msg => { ////هادي الرساله اللي يكتبها يقوله لديك 15 ثانيه تبي تعدلها  علي راحتك

msg.channel.sendFile(`${item.images}`).then(() => {
        message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
        .then((collected) => {
        message.channel.send(`${collected.first().author} ✅ **كفوو والله يا شنب اجابتك صحيحه**`); ////هنا يقوله اجابتك صحيحه وعلامة صح وهيك تبي تعدلها علي راحتك
        console.log(`[Typing] ${collected.first().author} typed the word.`);////هون بيكتبلك في الكونسل ايدي الشخص اللي كتب الاجابه صحيحه
            let userData = points[message.author.id];
            userData.points++;
          })
          .catch(collected => {
            message.channel.send(`**تم الانتهاء من الوقت  حظ اوفر المره القادمه :stopwatch: الاجابه هي : __${item.answers}__ **`); ////هنا يقوله تم الانتهاء من الوقت لما ما يجاوب والوقت يخلص تبي تعدلها علي راحتك
            console.log('[Typing] Error: No one type the word.');
          })
        })
    })
}
});

client.on('message', message => {
if (message.content.startsWith(prefix + 'نقاطي')) { ////هنا امر النقاط تبي تعدلها علي راحتك
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

/////وبس هيك خلصنا الكود 
client.login("NDI3ODU3NjIyMDYyODU4MjUw.DdCxIQ.TGeNj5Hwzq4yIuapYXaJvW3VRwA");////هون تحط توكن بوتك


