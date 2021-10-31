import { Message, Client } from "discord.js";
import { config } from "..";

export default {
  name: "set_user_exited_chat",
  description: "Set the user exited chat",
  usage: "set_user_exited_chat <chat_id>",
  execute: async (message: Message, args: string[], client: Client) => {
    if (!args[0]) return await message.channel.send("Please provide a chat id");

    await message.guild.channels.cache
      .get(args[0])
      .send("test message")
      .then(async (msg) => {
        await msg.delete();
        message.channel.send("Successfuly Updated!");
      })
      .catch(async (err) => {
        console.log(err.red);
        await message.channel.send("Error");
      });

    config.userExitedChat = args[0];
  },
};
