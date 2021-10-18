var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MessageEmbed } from "discord.js";
export default {
    name: "kick",
    description: "kick",
    usage: "kick <@user>",
    execute: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (message.member.id != "414196720101228545") {
            if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.hasPermission("KICK_MEMBERS")))
                return yield message.reply("You don't have permission to use this command!");
            const member = message.mentions.members.first();
            let reason = args.slice(1).join(" ");
            if (!reason)
                reason = "No reason provided";
            if (!member)
                return yield message.reply("Please mention a valid member of this server");
            if (!member.kickable)
                return yield message.reply("I cannot kick this user!");
            member.kick()
                .then(() => __awaiter(void 0, void 0, void 0, function* () {
                yield message.channel.send(new MessageEmbed()
                    .setTitle("Mute")
                    .setColor("#dd9299")
                    .setThumbnail(member.user.displayAvatarURL())
                    .setDescription(`**Member:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`));
            }))
                .catch((err) => {
                message.reply("An error occured");
                console.error(err);
            });
        }
    })
};
