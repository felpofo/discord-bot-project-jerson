import { Message } from "discord.js";

//todo nao ta funcionando
export default {
  name: "rmrole",
  description: "Removes a role from a user.",
  usage: "rmrole <user> <role name>",
  execute: async (message: Message, args: Array<string>) => {
    if (message.member.id != "414196720101228545")
      if (!message.member.hasPermission("MANAGE_ROLES"))
        return message.reply("You don't have permission to do that!");

    if (args.length < 2) return message.channel.send("You didn't provide enough arguments.");
    
    const user = message.mentions.users.first();
    const member = message.guild.member(user);
    if (!user || !member) return message.channel.send("Couldn't find that user.");
    
    const role = message.guild.roles.cache.find(r => r.name === args[1]);

    if (member.roles.cache.find(r => r.name === args[1])){
      member.roles.remove(role)
        .catch(() => {
          console.error;
          return message.channel.send("An error occurred.");
        });
    } else message.channel.send("This member don't have this role!");
    return message.channel.send(`Removed role ${role} from ${user.username}`);
  }
};

// [
//   '[LVL 1]: <@&771689388035276810>',
//   'Só nós: <@&892011611915714591>',
//   'bobalhão: <@&842387552622215169>',
//   'Pobre: <@&888505920940806196>',
//   '[LVL 5]: <@&771689384222261259>',
//   'lolzinho gay kkk: <@&882220306008264734>',
//   'Exclusivo: <@&771689344686751774>',
//   'Odeia pobres: <@&873016102354059324>',
//   '[LVL 10]: <@&771689382313721876>',
//   '[LVL 15]: <@&771689380821598219>',
//   '👑 Ganhador do NoFap 2021: <@&882951639181451304>',
//   'Silenciado: <@&898178676309516288>',
//   '[LVL 3]: <@&771689386261479444>',
//   '@everyone: <@&766369658055426069>'
// ]