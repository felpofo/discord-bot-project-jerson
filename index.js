//TODO TERMINAR O USERINFO
//TODO setar permissoes em todos as categorias - set category permissions
//TODO setar permissoes em todos os canais - set channel permissions
//TODO ban
//TODO kick
//TODO unmute
//TODO ping
//TODO help

//#region //? IMPORTS ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
import Discord from "discord.js";
import prompt from "prompt-sync";
import readline from "readline";
import c from "colors";
import fs from "fs";

import * as u from "./utils.js";

const log = console.log;
const app = JSON.parse(fs.readFileSync("./package.json"));
const config = JSON.parse(fs.readFileSync("./config.json"));
//#endregion //!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// log(`+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+`.magenta.bold);
// log(` > ${app.name} v${app.version} made by ${app.author.url.underline} < `.yellow);
// log(`+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+`.magenta.bold);

//#region //? VARIABLES AND INITIALIZATION |||||||||||||||||||||||||||||||||||||||||||||||||||
c.setTheme({
  info: ["magenta", "underline"],
  warn: ["yellow", "underline"],
  error: ["red", "underline"],
  debug: ["cyan", "bold"],
});

if (config.debug == undefined) config.debug == false;

if (!config.channel)
  config.channel = {
    id: undefined,
    name: undefined,
  };

if (!config.webhook.enabled) {
  config.webhook.enabled = false;
  u.warn("Webhook disabled".warn);
} else u.warn("Webhook enabled".warn);

if (process.argv[2]) {
  if (process.argv[3]) String(process.argv[3]);
  config.token = String(process.argv[2]);
} else {
  if (!config.token) {
    config.token = prompt("Token: ");

    if (!config.token) {
      u.error("No Token Provided");
      u.exit(1);
    }
  }

  if (!config.channel.id)
    config.channel.id =
      prompt("Chat ID: (skip if u don' want)") || undefined;
}

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (let file of commandFiles) {
  import(`./commands/${file}`)
    .then((mod) => {
      client.commands.set(mod.default.name, mod.default);
      if (config.debug) log(`[ ${"DEBUG".debug} ] ` + `Loaded command: ${mod.default.name.info}`);
    })
    .catch((err) => {
      u.error(`Erro ao carregar o comando ${file}`.error);
      u.error(err);
    });
}
//#endregion //!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//#region //? WEBHOOK ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
if (config.webhook.enabled) {
  const webhook = new Discord.WebhookClient(
    config.webhook.id,
    config.webhook.token
  );
  if (webhook.id) u.info("Webhook Initializated".warn);
}
//#endregion //!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//#region //? DISCORD EVENTS |||||||||||||||||||||||||||||||||||||||||||||||||||||||||
client.once("ready", () => {
  u.info(`Logged in as ${client.user.tag.info}`);
  if (config.channel.id) {
    u.update_chat(config.channel.id, false);
    u.get_chat();
  }
});

client.on("message", (message) => {
  if (message.channel.type == "text") {
    if (message.embeds[0]) {
      if (message.author.id == client.user.id) return;
      const regex = /<\w*:\w*:\d*>\s*[^\w:<>]*/g
      var embed = message.embeds[0];

      if (embed.title) log(`[ ${message.author.tag} ] [ ${"TITLE".cyan.bold} ] ${embed.title.replace(regex, "")}`)
      if (embed.description) log(`[ ${message.author.tag} ] [ ${"DESC".cyan.bold} ] ${embed.description.replace(regex, "")}`)
      if (embed.footer) log(`[ ${message.author.tag} ] [ ${"FOOTER".cyan.bold} ] ${embed.footer.text.replace(regex, "")}`)
      
    } else {
      u.log_message(message.channel.name, message.author.tag, message.content);
    }
  }

  if (message.channel.type == "dm") {
    if (!message.author.bot)
      u.log_message("DM", message.author.tag, message.content);
      
      if (message.content.match(/(sou)\s*(foda)\s*\w+/g)) {
      const video = fs.readFileSync("./assets/sex.mp4");
      message.channel.send(
        new Discord.MessageAttachment(video, "SPOILER_sex.mp4")
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
  completer: (line) => {
    const formatted_commands = Object.keys(rl.commands);
    formatted_commands.forEach(
      (value, index) => (formatted_commands[index] = value.replace("_", " "))
    );
    const hits = formatted_commands.filter((c) => c.startsWith(line));
    return [hits.length ? hits : completions, line];
  },
});

rl.commands = {
  send: (args) => u.send_bot_message(args.join(" ")),
  set: (args) => u.set(),
  set_chat: (args) => u.update_chat(String(args[0])),
  set_category: (args) => u.set_category(args),
  get: (args) => u.get(),
  get_chat: (_) => u.get_chat(),
  debug: (args) => u.debug(String(args[0])),
  clear: (args) => u.clear(),
  help: (args) => u.help(),
  exit: (args) => u.exit(Number(args[0])),
};

rl.on("line", (line) => {
  if (line == "") return;

  let args = line.split(/ +/);
  const command = args.shift().slice().toLowerCase();
  if (args) var command2 = `${command}_${args[0]}`;

  if (command2 in rl.commands) {
    rl.commands[command2](args.slice(1));
  } else if (command in rl.commands) {
    rl.commands[command](args);
  } else u.warn(`Comando não encontrado`);
});

rl.on("SIGINT", () => {
  rl.write(" ~");
  rl.clearLine();
})

rl.on("SIGTSTP", () => {
  u.exit(0);
})
//#endregion //!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

export { client, config };