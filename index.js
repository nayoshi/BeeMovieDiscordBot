const request = require("request");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();

fs.readFile("token","utf8",(err,token)=>{
    bot.login(token);
})

bot.on("ready",()=>console.log(bot.user.username + " is ready!"));

bot.on("message",(message)=>{
    if(message.author.id == bot.user.id)
        return;
    if(message.author.bot)
        return;
    if(message.channel.id != "568292101314445312")
        return;
    if(message.content == "!bee"){
        request({
            uri:"https://pastebin.com/raw/1eJr2RLR",
            method: 'GET',
        },async (err,res,body)=>{
            let bee_movie_script = body;
            let bee_movie_by_line = bee_movie_script.split("\n");
            sendLineByLine(message.channel,bee_movie_by_line,0);
            message.delete();
        });
    }else{
        message.delete();
    }
});

async function sendLineByLine(channel,array,index){
    channel.send(array[index]).then(async msg => {
        
        if(index+1 < array.length)
            setTimeout(()=>{
                sendLineByLine(channel,array,index+1);
            },1000);
        else
            return;
    })
}