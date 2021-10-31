import { Client, Message } from "discord.js";

export default {
  name: "purge",
  description: "Purge messages",
  usage: "purge <number>",
  execute: async (message: Message, args: Array<string>, client: Client) => {
    if (message.channel.type != "dm") {
      if (message.member.id != "414196720101228545")
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
          return await message.channel.send(
            "You don't have permission to do that!"
          );

      const i = Number(args[0]);
      if (isNaN(i) || !i)
        return await message.channel.send("Please enter a valid number!");

      if (i > 100)
        return await message.channel.send(
          "Please provide a number less than 100!"
        );

      message.channel
        .bulkDelete(i + 1)
        .then(
          async (messages) =>
            await message.channel.send(`${messages.size - 1} messages removed!`)
        )
        .catch(
          async (error: unknown) =>
            await message.channel.send(
              `Couldn't purge messages because of: ${error}`
            )
        );
    }
  },
};
