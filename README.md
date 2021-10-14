# Setup  

## There's three ways to start the bot, and the first is creating `config.json` file and it seems like it:  

> - {  
>   - "token": "\<your-bot-token\>",  
>   - "prefix": "\<discord prefix\>",  
>   - "channel": {  
>     - "id": "\<channel id\>"  
>   - },  
>   - "debug": \<boolean\>,
>   - "webhook": {  
>     - "enabled": \<boolean\>,
>     - "type": \<number\>,  
>     - "id": "\<id\>",  
>     - "name": "\<webhook name\>",  
>     - "avatar": "\<other id\>",  
>     - "channel_id": "\<another id\>",  
>     - "guild_id": "\<and another id\>",  
>     - "application_id": \<idk\>,  
>     - "token": "\<token\>"  
>   - }  
> - }  

## The second is directaly inserting, and will always be prioritized, followed by config file  
- ## **e.g.** `node . \<token\> \<channel\>`  
- ## **or** `node . \<token\>`  
- ## **or** `yarn start` with pre-configurated token and/or channel  

## The third way is absolving set token, and when you start the program it will ask the `token` and `channel id` from command line, you can skip channel  

- ### **The essential option is `prefix`, others can be removed, but i highly recommend set `token` from here, its more pratical**  

- ### The `channel id` is for send messages from your bot from <u>command line</u>, you can set it later if you want  

- ### All infos from webhook section is from webhook link, he looks like this: `https://discord.com/api/webhooks/<id>/<token>/`, you can get him from `Server Options > Integrations > Webhooks` on your discord server, and you don't need it if you don't want integrate webhooks to the bot, you can enable or disable him by enable option, if it doesn't exists, it will be automatically disabled  

- ### There isn't much to show with debug mode, so for now it just shows loaded commands  

- ## To close the program press `ctrl + z` or type `exit`, `ctrl + c` skip the line  