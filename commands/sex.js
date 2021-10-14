import { MessageAttachment } from "discord.js";
import { readFileSync } from "fs";

export default {
  name: "sex",
  description: "Send \"sex\" video",
  usage: "sex [@user]",
  execute: (message) => {
    message.channel.bulkDelete(1);

    var mention = message.mentions.users.first();
    const video = readFileSync("./assets/sex.mp4");
    const attachment = new MessageAttachment(video, "sex.mp4");

    if (!mention) message.channel.send(attachment);
    else message.channel.send(`||<@${mention.id}>||`, attachment);
  },
};
