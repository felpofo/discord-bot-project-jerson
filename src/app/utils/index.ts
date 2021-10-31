import "colors";
import {
  TextChannel,
  User,
  Message,
  Snowflake,
  DMChannel,
  Collection,
  Client,
  NewsChannel,
} from "discord.js";
import axios from "axios";

import { client, config } from "..";

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

export function log_message(message: Message) {
  if (message.channel.type == "dm")
    log(`[ ${message.author.username} ] ${message.content}`);
  else
    log(
      `[ ${message.channel.name.magenta.bold} ] ${message.author.username.underline}: ${message.content}`
    );
}

export function update_chat(id: Snowflake, log = true) {
  config.channel.id = undefined;
  config.channel.name = undefined;

  if (!id) return warn("Digite um ID");
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
    return info(
      "Chat atualizado para: " + config.channel.name.magenta.underline
    );
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

export function set_category(id: Snowflake, permission: string): void {
  throw new Error("Not implemented");
}

export function get() {
  log("Comandos:".bold);
  log("get     - mostra alguma configuraçao".yellow);
  log("> chat  - mostra o chat atual".yellow);
}

export function get_chat() {
  info(`Chat Name: ${config.channel.name.magenta.underline}`);
  info(`Chat ID: ${config.channel.id.magenta.underline}`);
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

export interface IQueue {
  songs: {
    id?: string;
    url?: string;
    title?: string;
    duration?: number;
    thumbnail?: string;
    requester?: string;
  };

  loop?: boolean;
  loop_queue?: boolean;

  channel_id?: string;
}

export class Queue {
  queue: Collection<number, IQueue>;
  add(song_url: string): void {
    // asd
  }
  remove(song_id: string): void {
    // asd
  }
  shuffle(): void {
    // asd
  }
  clear(): void {
    // asd
  }
  is_empty(): boolean | void {
    // asd
  }
  loop(): void {
    // asd
  }
  loop_queue(): void {
    // asd
  }
  is_looping(): boolean | void {
    // asd
  }
}

type UserInfos = {
  banner?: string;
  accent_color?: string;
};

export async function getUserBannerUrl(
  user: User,
  client: Client
): Promise<string> {
  const response = await axios.get(`https://discord.com/api/users/${user.id}`, {
    headers: { Authorization: `Bot ${client.token}` },
  });

  const { banner, accent_color }: UserInfos = response.data;

  if (banner) {
    const extension = banner.startsWith("a_")
      ? ".gif?size=4096"
      : ".png?size=4096";
    return `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}`;
  } else if (accent_color) {
    return `#${parseInt(accent_color, 16)}`;
  } else {
    return "No Banner";
  }
}

export function dateformat(date: Date) {
  const sus = {
    hour:
      date.getUTCHours() >= 10 ? date.getUTCHours() : `0${date.getUTCHours()}`,
    minute:
      date.getUTCMinutes() >= 10
        ? date.getUTCMinutes()
        : `0${date.getUTCMinutes()}`,
    second:
      date.getUTCSeconds() >= 10
        ? date.getUTCSeconds()
        : `0${date.getUTCSeconds()}`,
    day: date.getUTCDate() >= 10 ? date.getUTCDate() : `0${date.getUTCDate()}`,
    month:
      date.getUTCMonth() + 1 >= 10
        ? date.getUTCMonth() + 1
        : `0${date.getUTCMonth() + 1}`,
    year:
      date.getUTCFullYear() >= 10
        ? date.getUTCFullYear()
        : `0${date.getUTCFullYear()}`,
  };

  return `${sus.hour}:${sus.minute}:${sus.second} ${
    sus.hour > 12 ? "PM" : "AM"
  } ${sus.day}/${sus.month}/${sus.year}`;
}
