import { MessageEmbed, Message, Client, User } from "discord.js";
import axios from "axios";
import dateformat from "dateformat";

//todo mostrar as flags no titulo do embed
//* user: User {
//*   id: '414196720101228545',
//*   system: null,
//*   locale: null,
//*   flags: [UserFlags],
//*   username: 'pedrao',
//*   bot: false,
//*   discriminator: '5621',
//*   avatar: '0ee1873a5f810987f0674f293954a345',
//*   lastMessageID: '897913350258823208',
//*   lastMessageChannelID: '897880498804752456'
//* }

type UserInfos = {
  banner?: string,
  accent_color?: string
}

async function getUserBannerUrl(user: User, client: Client) {
  await axios.get(`https://discord.com/api/users/${user.id}`, {
    headers: { Authorization: `Bot ${client.token}` }
  }).then((res) => {
    const { banner, accent_color }: UserInfos = res.data;

    if (banner) {
      const extension = banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
      return `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}`;
    } else if (accent_color) {
      return accent_color;
    } else {
      return "No Banner";
    }
  });
}

export default {
  name: "userinfo",
  description: "Display info about yourself or mentioned user",
  usage: "userinfo [@user]",
  execute: async (message: Message, _: Array<string>, client: Client) => {
    const user = message.mentions.users.first() || message.author;
    const member = message.guild.member(user);

    if (!member) return message.reply("I can't find this user");

    const infos = {
      user: {
        tag: user.tag,
        id: user.id,
        avatar: user.avatarURL(),
        banner: await getUserBannerUrl(user, client),
        name: user.username,
        discriminator: user.discriminator,
        // verified: user.verified,
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
      //todo game user is playing
    };

    message.channel.send(
      new MessageEmbed({
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
          // { name: "Bot:", value: infos.user.bot, inline: true },
        ],
        thumbnail: { url: infos.user.avatar, height: 1024, width: 1024 },
      })
    );
  },
};