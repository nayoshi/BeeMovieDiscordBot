# Bee Movie Discord Bot

## Description
This is a discord bot that will send the bee movie script, line by line with a delay. It's pretty straight forward.

## Why?
![alt text](https://github.com/Nayoshi12/BeeMovieDiscordBot/blob/master/meme.png?raw=true "Dankest meme in the west")

## How to Run?
1. You need to create a discord bot and a discord server for it to join.
2. The link to join is typically
> https://discordapp.com/api/oauth2/authorize?client_id=\<INSERT APP ID>&permissions=0&scope=bot
3. Clone this repository
4. Run
> npm install
5. To start the bot, type 
> npm start
6. The console will ask a couple of question to authenticate.

## Advanced Usage
You can run the program with command line arguments in advance.
```| Variables         |     Arguments       |    Usage                                    |
| ------------------|---------------------|---------------------------------------------|
| Auth Token        | `--token`           | `node index.js --token <insert token>`      |
| Channel ID        | `-c` or `--channel` | `node index.js --channel <insert channelID>`|
| Timeout (Optional)| `-t` or `--timeout` | `node index.js --timeout 5000`              |```

* Side Note
Timeout is optional because the default for it is 1000. The value of timeout is in milliseconds, so if you want 5 second delay per message, then do 5 * 1000 = 5000 to put in the argument.
