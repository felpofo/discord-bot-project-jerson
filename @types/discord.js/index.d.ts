import { Client, Message } from "discord.js";

import { Queue } from "../../utils";

interface Command {
  name: string;
  description: string;
  usage: string;
  aliases?: string[];
  async execute(message: Message, args: string[], client: Client): void;
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
  
  remove(song_id: string): void {
    // qu;
  }

  clear(): void {
    //as
  }

  shuffle(): void {
    //as
  }

  loop(): void {
    //as
  }

  isEmpty(): boolean | void {
    //as
  }

  isLooping(): boolean | void {
    //as
  }

}

declare module "discord.js" {
  interface Client {
    commands: Collection<string, Command>;
    queue: Queue;
  }

  interface Channel {
    send(content: string, options?: MessageOptions): Promise<Message>;
  }
}