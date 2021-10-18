import { TextChannel, User, Message, Snowflake, DMChannel } from "discord.js";
import "colors";

import { client, config } from "./index.js";
const log = console.log;

export function info(text: string) {
  log(`[ ${"INFO".green} ] ${text}`);
}

export function warn(text: string) {
  log(`[ ${"WARN".yellow} ] ${text}`);
}

export function error(text: string) {
  log(`[ ${"ERROR".red} ] ${text}`);
}

export function log_message(channel: TextChannel | DMChannel, user: User, message: Message) {
  if (channel.type == "dm") log(`[ ${"DM".cyan.bold} ] [ ${user.username} ] ${message.content}`);
  else log(`[ ${channel.name.magenta.bold} ] ${user.username.underline}: ${message.content}`);
}

export function update_chat(id: Snowflake, log = true) {
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
    return info("Chat atualizado para: " + config.channel.name.magenta.underline);
  }
}

export function send_bot_message(message: string) {
  if (message == "") return warn("Mensagem vazia");
  if (!config.channel.id) return warn("Chat não definido");

  try {
    client.channels.cache.get(config.channel.id).send(message);
  } catch (err) {
    error("Erro ao enviar a mensagem");
    error(err);
  }
}

export function set() {
  log("Comandos:".bold);
  log("set     - define alguma configuraçao".yellow);
  log("> chat  - define o chat".yellow);
}

export function set_chat(id: string): void { throw new Error("Not implemented"); }

export function set_category(id: Snowflake, permission: string): void { throw new Error("Not implemented"); }

export function get() {
  log("Comandos:".bold);
  log("get     - mostra alguma configuraçao".yellow);
  log("> chat  - mostra o chat atual".yellow);
}

export function get_chat() {
  info("Chat Name: " + String(config.channel.name).magenta.underline);
  info("Chat ID: " + String(config.channel.id).magenta.underline);
}

export function debug(mode: "on" | "off" | string) {
  if (mode == "on") config.debug = true;
  else if (mode == "off") config.debug = false;
  else if (mode) {
    log("debug  - mostra o status do modo debug".yellow);
    log("> on   - liga o modo debug".yellow);
    log("> off  - desliga o modo debug".yellow);
  }

  log(`Modo debug: ${config.debug ? "true".green : "false".red}`);
}

export function clear() {
  process.stdout.write("\x1Bc");
}

export function help() {
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

export function exit(exit_code: number) {
  process.exit(exit_code || 0);
}

interface IQueue {
  url?: string;
  title?: string;
  duration?: number;
  thumbnail?: string;
  requester?: string;
  channel?: string;
  id?: string;
}

export class Queue {
  queue: IQueue[];

  add(song_url: string): void {
    this.queue.push({
      url: song_url,
      title: "",
      duration: 0,
      thumbnail: "",
      requester: "",
      channel: "",
      id: "",
    });
  }
  remove(song_id: string): void {}
  clear(): void {}
  shuffle(): void {}
  loop(): void {}
  isEmpty(): boolean | void {}
  isLooping(): boolean | void {}

}
