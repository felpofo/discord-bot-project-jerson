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
import axios from "axios";
import * as dateformat from "dateformat";
function getUserBannerUrl(user, client) {
    return __awaiter(this, void 0, void 0, function* () {
        yield axios.get(`https://discord.com/api/users/${user.id}`, {
            headers: { Authorization: `Bot ${client.token}` }
        }).then((res) => {
            const { banner, accent_color } = res.data;
            if (banner) {
                const extension = banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
                return `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}`;
            }
            else if (accent_color) {
                return accent_color;
            }
            else {
                return "No Banner";
            }
        });
    });
}
export default {
    name: "userinfo",
    description: "Display info about yourself or mentioned user",
    usage: "userinfo [@user]",
    execute: (message, _, client) => __awaiter(void 0, void 0, void 0, function* () {
        const user = message.mentions.users.first() || message.author;
        const member = message.guild.member(user);
        if (!member)
            return message.reply("I can't find this user");
        const infos = {
            user: {
                tag: user.tag,
                id: user.id,
                avatar: user.avatarURL(),
                banner: yield getUserBannerUrl(user, client),
                name: user.username,
                discriminator: user.discriminator,
                bot: user.bot,
                status: user.presence.status,
                created_at: dateformat(user.createdAt, "h:MM:ss TT dd/mm/yyyy"),
            },
            member: {
                nickname: member.nickname || user.username,
                joined_at: dateformat(member.joinedAt, "h:MM:ss TT dd/mm/yyyy"),
                all_roles: member.roles.cache.map(role => `<@&${role.id}> `).join(" "),
                highest_role: member.roles.highest.id,
            },
        };
        message.channel.send(new MessageEmbed({
            type: "rich",
            title: infos.user.tag,
            description: null,
            url: null,
            color: parseInt("C1DBA4", 16),
            timestamp: null,
            fields: [
                {
                    name: "Created at:",
                    value: infos.user.created_at,
                    inline: true
                },
                {
                    name: "Joined at:",
                    value: infos.member.joined_at,
                    inline: true
                },
                {
                    name: "Roles:",
                    value: infos.member.all_roles,
                    inline: false
                },
                {
                    name: "Highest Role:",
                    value: `<@&${infos.member.highest_role}>`,
                    inline: true
                },
                {
                    name: "Avatar:",
                    value: `[Clique aqui!](${infos.user.avatar})`,
                    inline: true
                },
                {
                    name: "Banner:",
                    value: infos.user.banner,
                    inline: true
                },
                {
                    name: "Status:",
                    value: infos.user.status,
                    inline: true
                },
                {
                    name: "Nickname:",
                    value: infos.member.nickname,
                    inline: true
                },
                {
                    name: "Discriminator:",
                    value: infos.user.discriminator,
                    inline: true
                },
                {
                    name: "Playing:",
                    value: "placeholder",
                    inline: true
                },
                {
                    name: "ID:",
                    value: infos.user.id,
                    inline: true
                },
            ],
            thumbnail: { url: infos.user.avatar, height: 1024, width: 1024 },
        }));
    }),
};
