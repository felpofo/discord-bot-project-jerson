//TODO TERMINAR O USERINFO
//TODO setar permissoes em todos as categorias - set category permissions
//TODO setar permissoes em todos os canais - set channel permissions
//TODO ban
//TODO kick
//TODO unmute
//TODO ping
//TODO help

//#region //? IMPORTS ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

import "dotenv/config";
import "colors";

import { Client, MessageAttachment, Collection } from "discord.js";
import { readFileSync, readdirSync } from "fs";
import path from "path";

import readline from "readline";
import axios from "axios";

import * as u from "./utils";
const log = console.log;

//#endregion //!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//#region //? VARIABLES AND INITIALIZATION |||||||||||||||||||||||||||||||||||||||||||||||||||

export const config = {
  token: process.env.TOKEN,
  prefix: process.env.PREFIX ?? "cj.",
  debug: process.env.DEBUG ? true : false,
  channel: {
    id: process.env.CHANNEL_ID,
    name: undefined,
  },
  webhook: {
    enabled: process.env.WEBHOOK_ENABLED ? true : false,
    url: process.env.WEBHOOK_URL,
  },
  userJoinedChat: undefined,
  userExitedChat: undefined,
};

if (!config.token) {
  u.error("Token not found!".red);
  process.exit(1);
}

if (!config.debug) config.debug = false;
if (!config.prefix) config.prefix = "cj.";
if (!config.channel.id) u.warn("No channel ID provided.".yellow.underline);

export const client = new Client();
client.commands = new Collection();
client.queue = new u.Queue();

const commandFiles = readdirSync(path.join(__dirname, "commands")).filter(
  (file) => file.match(/(\w+\.(t|j)s)/g)
);

for (const file of commandFiles) {
  import(path.join(__dirname, "commands", file))
    .then((mod) => {
      client.commands.set(mod.default.name, mod.default);
      if (config.debug)
        log(
          `[ ${"DEBUG".cyan} ] Loaded command: ${
            mod.default.name.magenta.underline
          }`
        );
    })
    .catch((err) => {
      u.error(`Erro ao carregar o comando ${file}`.underline.red);
      u.error(err.red);
    });
}

//#endregion //!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//#region //? WEBHOOK ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// async function webhookData(url: string) {
//   interface IWebhookInfo {
//     type: WebhookTypes;
//     id: Snowflake;
//     name: string;
//     avatar: string;
//     channel_id: Snowflake;
//     guild_id: Snowflake;
//     application_id: unknown;
//     token: string;
//   }

//   return axios.get<IWebhookInfo>(url).then((res) => res.data);
// }

// if (config.webhook.enabled) {
//   if (config.debug) u.warn("Webhook enabled".yellow.underline);

//   const webhook_infos = webhookData(config.webhook.url);
//   console.log("infos:");
//   console.log(webhook_infos);

//   const webhook = new WebhookClient(webhook_infos.id, webhook_infos.token);
//   if (webhook.id) u.info("Webhook Initializated".yellow.underline);
// } else { if (config.debug) u.warn("Webhook disabled".yellow.underline); }

//#endregion //!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//#region //? DISCORD EVENTS |||||||||||||||||||||||||||||||||||||||||||||||||||||||||

client.once("ready", async () => {
  u.info(`Logged in as ${client.user.tag.magenta.underline}`);
  if (config.channel.id)
    await u.update_chat(config.channel.id, false).then(u.get_chat);
});

client.on("message", async (message) => {
  u.log_message(message);

  if (message.content.match(/(sou)\s*(foda)\s*\w+/g))
    await message.channel.send(
      new MessageAttachment(readFileSync("./assets/sex.mp4"), "SPOILER_sex.mp4")
    );

  if (message.channel.type == "dm" || message.author.id) return;

  if (message.embeds[0] && message.author.id != client.user.id) {
    const regex = /<\w*:\w*:\d*>\s*[^\w:<>]*/g;
    const embed = message.embeds[0];

    if (embed.title)
      log(
        `[ ${message.author.tag} ] [ ${
          "TITLE".cyan.bold
        } ] ${embed.title.replace(regex, "")}`
      );
    if (embed.description)
      log(
        `[ ${message.author.tag} ] [ ${
          "DESC".cyan.bold
        } ] ${embed.description.replace(regex, "")}`
      );
    if (embed.footer)
      log(
        `[ ${message.author.tag} ] [ ${
          "FOOTER".cyan.bold
        } ] ${embed.footer.text.replace(regex, "")}`
      );
  }

  if (message.author.bot || !message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (client.commands.has(command))
    client.commands.get(command).execute(message, args, client);
});

client.login(config.token).catch((err) => {
  u.error(
    String(err)
      .replace("[", "")
      .replace("]", "")
      .replace("_", " ")
      .replace(String(err).trim().split(" ").shift(), "")
      .trim()
  );
  u.exit(1);
});

//#endregion //!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//#region //? READLINE |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  removeHistoryDuplicates: true,
  prompt: "",
  tabSize: 4,
  completer: (line: string): [string[], string] => {
    const formatted_commands = Object.keys(rl.commands);
    formatted_commands.forEach(
      (value, index) => (formatted_commands[index] = value.replace("_", " "))
    );
    const hits = formatted_commands.filter((c) => c.startsWith(line));
    return [hits.length ? hits : formatted_commands, line];
  },
});

rl.commands = {
  send: (args: Array<string>) => u.send_bot_message(args.join(" ")),
  set: () => u.set(),
  set_chat: (args: Array<string>) => u.update_chat(String(args[0])),
  get: () => u.get(),
  get_chat: () => u.get_chat(),
  debug: (args: Array<string>) => u.debug(String(args[0])),
  clear: () => u.clear(),
  help: () => u.help(),
  exit: (args: Array<string>) => u.exit(Number(args[0])),
};

rl.on("line", (line) => {
  if (line == "") return;

  const args = line.split(/ +/);
  const command = args.shift().slice().toLowerCase();
  if (args) {
    const command2 = `${command}_${args[0]}`;

    if (command2 in rl.commands) {
      rl.commands[command2](args.slice(1));
    } else if (command in rl.commands) {
      rl.commands[command](args);
    } else u.warn("Comando não encontrado");
  }
});

rl.on("SIGINT", () => {
  rl.write(" ~");
  rl.clearLine();
});

rl.on("SIGTSTP", () => {
  u.exit(0);
});

//#endregion //!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
