import { Message } from "discord.js";

//todo provavelmente nao ta funcionando tmb
export default {
  name: "addrole",
  description: "Add a role for a user.",
  usage: "addrole <user> <role name>",
  execute: (message: Message, args: Array<string>) => {
    if (message.member.id != "414196720101228545")
      if (!message.member.hasPermission("MANAGE_ROLES"))
        return message.reply("You don't have permission to do that!");
    
    if (args.length < 2) return message.channel.send("You didn't provide enough arguments.");
    
    const user = message.mentions.users.first();
    const member = message.guild.member(user);
    if (!user || !member) return message.channel.send("Couldn't find that user.");
    
    const role = message.guild.roles.cache.find(r => r.name === args[1]);

    if (!member.roles.cache.find(r => r.name === args[1])){
      try { member.roles.remove(role); }
      catch (err) {
        if (err.code === 50013) return message.channel.send("I don't have permission to add that role.");
        else return message.channel.send("An error occurred.");
      }
      
      return message.channel.send(`Added role ${role} for ${user}`);
    } else message.channel.send("This member already have this role!");
  }
};