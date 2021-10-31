import { Snowflake, Collection, Message } from "discord.js";
import { IQueue } from ".";

//todo set_category permission interface

export function info(text: string): void;
export function warn(text: string): void;
export function error(text: string): void;

export function log_message(message: Message): void;
export function update_chat(id: Snowflake, log: boolean): void;
export function send_bot_message(message: string): void;

export function set(): void;

export function get(): void;
export function get_chat(): void;

export function debug(mode: string): void;
export function help(): void;

export function clear(): void;
export function exit(exit_code: number): void;

export class Queue {
  queue: Collection<number, IQueue>;

  add(song_url: string): void;
  remove(song_id: string): void;
  shuffle(): void;
  clear(): void;
  is_empty(): boolean | void;
  loop(): void;
  loop_queue(): void;
  is_looping(): boolean | void;
}
