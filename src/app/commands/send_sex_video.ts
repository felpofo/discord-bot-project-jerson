import { Message, MessageAttachment } from "discord.js";
import { readFileSync } from "fs";

export default {
  name: "sex",
  description: "Send \"sex\" video",
  usage: "sex [@user]",
  execute: async (message: Message) => {
    if (message.channel.type != "dm") { 
      message.channel.bulkDelete(1);

      const mention = message.mentions.users.first();
      const video = readFileSync("src/assets/sex.mp4");
      const attachment = new MessageAttachment(video, "sex.mp4");

      if (!mention) message.channel.send(attachment);
      else message.channel.send(`||<@${mention.id}>||`, attachment);
    }
  },
};
