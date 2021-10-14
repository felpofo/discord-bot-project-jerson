import c from "colors";
import { client, config } from "./index.js";

const log = console.log;

c.setTheme({
  info: ["magenta", "underline"],
  warn: ["yellow", "underline"],
  error: ["red", "underline"],
});

function info(text) {
  log(`[ ${"INFO".green} ] ${text}`);
}

function warn(text) {
  log(`[ ${"WARN".yellow} ] ${text}`);
}

function error(text) {
  log(`[ ${"ERROR".red} ] ${text}`);
}

function log_message(chat, user, message) {
  log(`[ ${c.bold.magenta(chat)} ] ${c.underline(user)}: ${message}`);
}

function update_chat(id, log = true) {
  config.channel.id = undefined;
  config.channel.name = undefined;

  if (!id) return warn("ID inválido");
  if (id.length != 18) return warn("ID inválido");

  client.guilds.cache.forEach((value) => {
    const channel = value.channels.cache.get(String(id));
    if (channel) {
      config.channel.id = channel.id;
      config.channel.name = channel.name;
    }
  });

  if (log) {
    if (!config.channel.id) return error("Chat não encontrado");
    return info("Chat atualizado para: " + config.channel.name.info);
  }
}

function send_bot_message(message) {
  if (message == "") return warn("Mensagem vazia");
  if (!config.channel.id) return warn("Chat não definido");

  try {
    client.channels.cache.get(config.channel.id).send(message);
  } catch (err) {
    error("Erro ao enviar a mensagem");
    error(err);
  }
}

function set() {
  log("Comandos:".bold);
  log("set     - define alguma configuraçao".yellow);
  log("> chat  - define o chat".yellow);
}

function get() {
  log("Comandos:".bold);
  log("get     - mostra alguma configuraçao".yellow);
  log("> chat  - mostra o chat atual".yellow);
}

function get_chat() {
  info("Chat Name: " + String(config.channel.name).info);
  info("Chat ID: " + String(config.channel.id).info);
}

function debug(mode) {
  if (mode == "on") config.debug = true;
  else if (mode == "off") config.debug = false;
  else if (mode) {
    log("debug  - mostra o status do modo debug".yellow);
    log("> on   - liga o modo debug".yellow);
    log("> off  - desliga o modo debug".yellow);
    log();
  }
  log(`Modo debug: ${config.debug ? "true".green : "false".red}`);
}

function clear() {
  process.stdout.write("\x1Bc");
}

function help() {
  log("Comandos:".bold);
  log("send   - envia uma mensagem para o chat".yellow);
  log("set    - define alguma configuraçao".green);
  log("> chat - define o chat".green);
  log("get    - mostra alguma configuraçao".cyan);
  log("> chat - mostra o chat atual".cyan);
  log("debug  - mostra o status do modo debug".magenta);
  log("> on   - liga o modo debug".magenta);
  log("> off  - desliga o modo debug".magenta);
  log("help   - mostra os comandos".red);
  log("clear  - limpar o terminal".red);
  log("exit   - encerrar o processo".red);
}

function exit(exit_code) {
  process.exit(exit_code || 0);
}

export {
  info,
  warn,
  error,
  log_message,
  update_chat,
  send_bot_message,
  set,
  get,
  get_chat,
  debug,
  help,
  clear,
  exit,
};
