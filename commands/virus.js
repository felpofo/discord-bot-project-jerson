import { MessageAttachment } from "discord.js";
import { readFileSync } from "fs";

export default {
  name: "virus",
  description: "Send \"your computer has virus\" video",
  usage: "virus [@user]",
  execute: (message) => {
    message.channel.bulkDelete(1);

    var mention = message.mentions.users.first();
    const video = readFileSync("./assets/marcos.mp4");
    const attachment = new MessageAttachment(video, "marcos.mp4");

    if (!mention) message.channel.send(attachment);
    else message.channel.send(`||<@${mention.id}>||`, attachment);
  },
};
