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
    name: "mute",
    description: "Mute",
    usage: "mute <@user>",
    execute: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        if (!message.member.hasPermission("MANAGE_ROLES"))
            return yield message.reply("You do not have permission to use this command!");
        if (!message.guild.me.hasPermission("MANAGE_ROLES"))
            return yield message.reply("I do not have permission to use this command!");
        if (!args[0])
            return yield message.reply("Please provide a user to mute!");
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member)
            return yield message.reply("You must specify a valid member of this server!");
        let reason = args.slice(1).join(" ");
        if (!reason)
            reason = "No reason provided";
        let muterole = message.guild.roles.cache.find(r => r.name === "Muted");
        if (!muterole) {
            try {
                muterole = yield message.guild.roles.create({
                    data: {
                        name: "Muted",
                        color: "#000000",
                        permissions: [],
                        hoist: false,
                        mentionable: true
                    }
                });
                message.guild.channels.cache.forEach((channel) => __awaiter(void 0, void 0, void 0, function* () {
                    yield channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                    });
                }));
            }
            catch (err) {
                console.log(err.stack);
            }
        }
        if (member.roles.cache.has(muterole.id))
            return yield message.reply("This user is already muted!");
        member.roles.add(muterole.id);
        yield message.channel.send(new MessageEmbed()
            .setTitle("Mute")
            .setColor("#dd9299")
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`**Member:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`));
    })
};
