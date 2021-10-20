import { Client, Message, MessageEmbed } from "discord.js";

export default {
  name: "help",
  description: "Get help on a command",
  usage: "help [command]",
  execute: async (message: Message, _args: Array<string>, client: Client) => {
    const commands = Object.keys(client.commands);

    return await message.channel.send(
      new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Help")
        .setDescription(
          commands.map((value) => {
            value;
          })
        )
    );
  }
};