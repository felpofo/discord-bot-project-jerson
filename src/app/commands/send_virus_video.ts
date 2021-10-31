import { MessageAttachment, Message } from "discord.js";
import { readFileSync } from "fs";

export default {
  name: "virus",
  description: "Send \"your computer has virus\" video",
  usage: "virus [@user]",
  execute: async (message: Message) => {
    if (message.channel.type != "dm") {
      message.channel.bulkDelete(1);

      const mention = message.mentions.users.first();
      const video = readFileSync("src/assets/marcos.mp4");
      const attachment = new MessageAttachment(video, "marcos.mp4");

      if (!mention) message.channel.send(attachment);
      else message.channel.send(`||<@${mention.id}>||`, attachment);
    }
  },
};
