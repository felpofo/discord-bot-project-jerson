import { Client, Message, MessageEmbed } from "discord.js";
import "colors";

export default {
  name: "mute",
  description: "Mute",
  usage: "mute <@user>",
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

    if (!args[0])
      return await message.channel.send("Please provide a user to mute!");

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!member)
      return await message.channel.send(
        "You must specify a valid member of this server!"
      );

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason provided";

    let muterole =
      message.guild.roles.cache.find((r) => r.name === "Muted") ||
      (await message.guild.roles
        .create({
          data: {
            position: 0,
            name: "Muted",
            color: "#000000",
            permissions: [],
            mentionable: true,
            hoist: false,
          },
        })
        .then((r) => (muterole = r))
        .catch((err) => {
          return console.log(err.red);
        })
        .finally(() => {
          message.guild.channels.cache.forEach(async (channel) => {
            await channel.createOverwrite(muterole, {
              SEND_MESSAGES: false,
              SEND_MESSAGES_IN_THREADS: false,
              CREATE_PUBLIC_THREADS: false,
              CREATE_PRIVATE_THREADS: false,
              EMBED_LINKS: false,
              ATTACH_FILES: false,
              ADD_REACTIONS: false,
              USE_EXTERNAL_EMOJIS: false,
              USE_EXTERNAL_STICKERS: false,
              MENTION_EVERYONE: false,
              MANAGE_MESSAGES: false,
              MANAGE_THREADS: false,
              SEND_TTS_MESSAGES: false,
              USE_APPLICATION_COMMANDS: false,

              SPEAK: false,
              STREAM: false,
              START_EMBEDDED_ACTIVITIES: false,
              USE_VAD: false,
              PRIORITY_SPEAKER: false,
              MUTE_MEMBERS: false,
              DEAFEN_MEMBERS: false,
              MOVE_MEMBERS: false,
            });
          });
        }));

    if (member.roles.cache.has(muterole.id))
      return await message.channel.send("This user is already muted!");
    member.roles.add(muterole.id);
    await message.channel.send(
      new MessageEmbed()
        .setTitle("Mute")
        .setColor("#dd9299")
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(
          `**Member:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`
        )
    );
  },
};
