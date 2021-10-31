import { Client, Message, MessageEmbed } from "discord.js";

import { config } from "..";

export default {
  name: "help",
  description: "Get help on a command",
  usage: "help [command]",
  execute: async (message: Message, _args: Array<string>, client: Client) => {
    return await message.channel.send(
      new MessageEmbed({
        type: "rich",
        title: "Help",
        color: parseInt("0099ff", 16),
        description: "**<...> is obrigatory\n[...] is optional**",
        fields: client.commands.map((command) => {
          return {
            name: `${config.prefix}${command.name}`,
            value: `__*Usage:*__ ${command.usage}\n__*Description:*__ ${command.description}`,
            inline: false,
          };
        }),
      })
    );
  },
};
