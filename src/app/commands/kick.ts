import { Client, MessageEmbed, Message } from "discord.js";

export default {
  name: "kick",
  description: "kick",
  usage: "kick <@user>",
  execute: async (message: Message, args: Array<string>, client: Client) => {
    if (message.member.id != "414196720101228545") {
      if (!message.member?.hasPermission("KICK_MEMBERS"))
        return await message.reply(
          "You don't have permission to use this command!"
        );

      const member = message.mentions.members.first();

      let reason = args.slice(1).join(" ");
      if (!reason) reason = "No reason provided";

      if (!member)
        return await message.reply(
          "Please mention a valid member of this server"
        );

      if (!member.kickable)
        return await message.reply("I cannot kick this user!");

      member
        .kick()
        .then(async () => {
          await message.channel.send(
            new MessageEmbed()
              .setTitle("Mute")
              .setColor("#dd9299")
              .setThumbnail(member.user.displayAvatarURL())
              .setDescription(
                `**Member:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`
              )
          );
        })
        .catch((err) => {
          message.reply("An error occured");
          console.error(err);
        });
    }
  },
};
