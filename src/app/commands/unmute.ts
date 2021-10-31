import { MessageEmbed, Message, Client } from "discord.js";

//TODO Transformar em unmute

export default {
  name: "unmute",
  description: "Unmute",
  usage: "unmute <@user>",
  execute: async (message: Message, args: Array<string>, client: Client) => {
    if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      return await message.channel.send(
        "I don't have permission to use this command!"
      );
    if (message.author.id != "414196720101228545")
      if (!message.member.hasPermission("MANAGE_ROLES"))
        return await message.channel.send(
          "You don't have permission to use this command!"
        );

    if (!message.mentions.users.first())
      return await message.channel.send("Please provide a user to unmute!");

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!member)
      return await message.channel.send(
        "You must specify a valid of this server!"
      );

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason provided";

    const muterole = message.guild.roles.cache.find(
      (role) => role.name == "Muted"
    );

    if (!member.roles.cache.has(muterole.id))
      return await message.channel.send("This user isn't muted!");

    if (member.roles.cache.has(muterole.id)) {
      await member.roles.remove(muterole.id);
      await message.channel.send(
        `<@${member.user.id}> has been unmuted by <@${message.author.id}>!`
      );
    }
  },
};
