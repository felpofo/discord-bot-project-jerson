import { MessageEmbed } from "discord.js";

export default {
  name: "mute",
  description: "Mute",
  usage: "mute <@user>",
  execute(message, args) {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You do not have permission to use this command!");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.reply("I do not have permission to use this command!");

    if (!args[0]) return message.reply("Please provide a user to mute!");

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.reply("You must specify a valid member of this server!");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason provided";
    
    let muterole = message.guild.roles.cache.find(r => r.name === "Muted");
    if (!muterole) {
      try {
        muterole = message.guild.roles.create({
          data: {
            name: "Muted",
            color: "#000000",
            permissions: []
          }
        });
        message.guild.channels.cache.forEach((channel) => {
          channel.createOverwrite(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
          });
        });
      } catch (err) {
        console.log(err.stack);
      }
    }
    if (member.roles.cache.has(muterole.id)) return message.reply("This user is already muted!");
    member.roles.add(muterole.id);
    message.channel.send(
      new MessageEmbed()
        .setTitle("Mute")
        .setColor("#dd9299")
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(
          `**Member:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`
        )
    );
  }
};
