const request = require("request");
const Discord = require("discord.js");
const min = require('minimist');
const fs = require("fs");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
const bot = new Discord.Client();
let _timeout;
let args;
async function start(){
    args = await min(process.argv.slice(2));
    checkToken();
};

function checkToken(){
    if(args.token == null){
        let ask_fn = readline.question(`What is the auth token? `, (token)=>{ 
            bot.login(token).catch(()=>{
                console.log("Invalid Token.\n");
                process.exit();
            });
     });
    }else{
        bot.login(args.token);
    }   
}




function setGlobalTimeout(time){
    _timeout = time;
}

let _channel;
bot.on("ready",()=>{
    console.log(bot.user.username + " is ready!");
    if(args.t != null){
        setGlobalTimeout(args.t);
    }else if(args.timeout != null){
        setGlobalTimeout(args.timeout);
    }else{
        setGlobalTimeout(1000);
    }
    console.log("\nLOG: delay every message is "+ _timeout/1000 +" seconds\n");

    if(args.c == null && args.channel==null){
        askChannelID();
    }else if((bot.channels.get(args.c) == null) && (bot.channels.get(args.channel) == null)){
        console.log("ERROR: Channel ID is invalid");
        askChannelID();
    }
});
function askChannelID(){
    let ask_fn = readline.question(`What is the channel ID? `, (id)=>{
        if(bot.channels.get(id) == null){
            console.log("ERROR: Channel ID is invalid");
            askChannelID();
        }
        else{
            _channel = id;
            console.log("Now listening to commands \"!bee\" in "+ bot.channels.get(id).name +" at " + bot.channels.get(id).guild.name+ "\n");
        }
        
     });
}
bot.on("message",(message)=>{
    
    if(message.author.id == bot.user.id)
        return;
    if(message.author.bot)
        return;
    if(message.channel.id != _channel)
        return;
    if(message.content == "!bee"){
        console.log("\n\n Bot Activated By: " + message.author.username+"\n");
        request({
            uri:"https://pastebin.com/raw/uhBb7E6t",
            method: 'GET',
        },async (err,res,body)=>{
            let bee_movie_script = body;
            let bee_movie_by_line = bee_movie_script.split("\n");
            sendLineByLine(message.channel,bee_movie_by_line,0);
            message.delete();
        });
    }
});

async function sendLineByLine(channel,array,index){
    channel.send(array[index]).then(async msg => {
        
        if(index+1 < array.length)
            setTimeout(()=>{
                sendLineByLine(channel,array,index+1);
                console.log("#"+index+" ",array[index])
            },_timeout);
            
        else
            return;
    })
}


start();