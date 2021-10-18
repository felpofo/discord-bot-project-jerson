//TODO TERMINAR O USERINFO
//TODO setar permissoes em todos as categorias - set category permissions
//TODO setar permissoes em todos os canais - set channel permissions
//TODO ban
//TODO kick
//TODO unmute
//TODO ping
//TODO help

//#region //? IMPORTS ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

import { Client, WebhookClient, MessageAttachment, Collection } from "discord.js";
import * as readline from "readline";
import "colors";
import { readFileSync, readdirSync } from "fs";

import * as u from "./utils.js";
const app = JSON.parse(readFileSync("./package.json").toString());
const config = JSON.parse(readFileSync("./config.json").toString()); 

const log = console.log;

//#endregion //!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

log("+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+".magenta.bold);
log(` > ${app.name} v${app.version} made by ${app.author.url.underline} < `.yellow);
log("+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+".magenta.bold);

//#region //? VARIABLES AND INITIALIZATION |||||||||||||||||||||||||||||||||||||||||||||||||||

if (config.debug == undefined) config.debug == false;

if (!config.channel)
  config.channel = {
    id: undefined,
    name: undefined,
  };

if (!config.webhook.enabled) {
  config.webhook.enabled = false;
  u.warn("Webhook disabled".yellow.underline);
} else u.warn("Webhook enabled".yellow.underline);

if (process.argv[2]) {
  if (process.argv[3]) String(process.argv[3]);
  config.token = String(process.argv[2]);
} else {
  if (!config.token) {
    u.error("No Token Provided");
    u.exit(1);
  }  
  if (!config.channel.id) {
    u.error("No channel ID provided. Please set it in config.json");
    u.exit(1);
  }
}

const client = new Client();
client.commands = new Collection();
client.queue = new u.Queue();

const commandFiles = readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  import(`./commands/${file}`)
    .then((mod) => {
      client.commands.set(mod.default.name, mod.default);
      if (config.debug) log(`[ ${"DEBUG".cyan.bold} ] ` + `Loaded command: ${mod.default.magenta.underline}`);
    })
    .catch((err) => {
      u.error(`Erro ao carregar o comando ${file}`.red.underline);
      u.error(err);
    });
}

//#endregion //!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//#region //? WEBHOOK ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

if (config.webhook.enabled) {
  const webhook = new WebhookClient(
    config.webhook.id,
    config.webhook.token
  );
  if (webhook.id) u.info("Webhook Initializated".yellow.underline);
}

//#endregion //!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//#region //? DISCORD EVENTS |||||||||||||||||||||||||||||||||||||||||||||||||||||||||

client.once("ready", () => {
  u.info(`Logged in as ${client.user.tag.magenta.underline}`);
  if (config.channel.id) {
    u.update_chat(config.channel.id, false);
    u.get_chat();
  }
});

client.on("message", (message) => {
  if (message.channel.type == "text") {
    if (message.embeds[0]) {
      if (message.author.id == client.user.id) return;
      const regex = /<\w*:\w*:\d*>\s*[^\w:<>]*/g;
      const embed = message.embeds[0];

      if (embed.title) log(`[ ${message.author.tag} ] [ ${"TITLE".cyan.bold} ] ${embed.title.replace(regex, "")}`);
      if (embed.description) log(`[ ${message.author.tag} ] [ ${"DESC".cyan.bold} ] ${embed.description.replace(regex, "")}`);
      if (embed.footer) log(`[ ${message.author.tag} ] [ ${"FOOTER".cyan.bold} ] ${embed.footer.text.replace(regex, "")}`);
      
    } else {
      u.log_message(message.channel, message.author, message);
    }
  }

  if (message.channel.type == "dm") {
    if (!message.author.bot)
      u.log_message(message.channel, message.author, message);
      
    if (message.content.match(/(sou)\s*(foda)\s*\w+/g)) {
      const video = readFileSync("./assets/sex.mp4");
      message.channel.send(
        new MessageAttachment(video, "SPOILER_sex.mp4")
      );
    }
  }
  
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args, client);
  } catch (err) {
    u.error(err);
  }
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
    log(typeof(line));
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
  set_category: (args: Array<string>) => u.set_category(String(args[0]), String(args[1])),
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

export { client, config };