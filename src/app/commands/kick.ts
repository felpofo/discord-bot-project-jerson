import { Client, MessageEmbed, Message } from "discord.js";

export default {
  name: "kick",
  description: "kick",
  usage: "kick <@user>",
  execute: async (message: Message, args: Array<string>, client: Client) => {
    if (message.member.id != "414196720101228545")
      if (!message.member.hasPermission("KICK_MEMBERS"))
        return await message.reply(
          "You don't have permission to use this command!"
        );

    const member = message.mentions.members.first();
    if (!member || !member.kickable)
      return await message.reply("I couldn't kick this user!");

    const reason = args.slice(1).join(" ") || "No reason provided";

    return member
      .kick()
      .then(async () => {
        const embed = new MessageEmbed();
        embed.thumbnail;
        embed.description = `**Member:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`;
        embed.title = "Mute";
        embed.color = parseInt("dd9299", 16);

        await message.channel.send(embed);
      })
      .catch(async (err) => {
        await message.reply("An error occured");
        console.error(err);
      });
  },
};
