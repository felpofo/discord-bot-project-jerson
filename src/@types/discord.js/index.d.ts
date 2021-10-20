import { Client, Message } from "discord.js";
import { Queue } from "../../utils";


interface Command {
  name: string;
  description: string;
  usage: string;
  aliases?: string[];
  execute(message: Message, args: string[], client: Client): void;
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