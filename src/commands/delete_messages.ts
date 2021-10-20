import { Message } from "discord.js";

export default {
  name: "purge",
  description: "Purge messages",
  usage: "purge <number>",
  execute: async (message: Message, args: Array<string>) => {
    if (message.channel.type != "dm") {
      if (message.member.id != "414196720101228545")
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
          return message.reply("You don't have permission to do that!");

      const i = Number(args[0]);
      if (isNaN(i)) return message.reply("Please enter a valid number!");

      if (!i) return message.reply("Please provide a number!");

      if (i > 100)
        return message.reply("Please provide a number less than 100!");

      message.channel.bulkDelete(i + 1)
        .then((messages) => message.reply(`${messages.size - 1} messages removed!`))
        .catch((error: unknown) => message.reply(`Couldn't purge messages because of: ${error}`));
    }
  }
};