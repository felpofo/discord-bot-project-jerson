# Setup  

## Create `config.json` file:  

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
- ### **The essential option is `prefix`, others can be removed**  

## If you don't want to put token in config.json:
- ## **e.g.** `node . \<token\> \<channel\>`  
- ## **or** `node . \<token\>`  
- ## **or** `yarn start` with pre-configurated token and/or channel  

- ### The `channel id` is for send messages from your bot from <u>command line</u>, you can set it later if you want  

- ### All infos from webhook section is from webhook link, he looks like this: `https://discord.com/api/webhooks/<id>/<token>/`, you can get him from `Server Options > Integrations > Webhooks` on your discord server, and you don't need it if you don't want integrate webhooks to the bot, you can enable or disable him by enable option, if it doesn't exists, it will be automatically disabled  

- ### There isn't much to show with debug mode, so for now it just shows loaded commands  

- ## To close the program press `ctrl + z` or type `exit`, `ctrl + c` skip the line  