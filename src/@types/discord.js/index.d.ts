import { Client, Message } from "discord.js";

import { Queue } from "../../app/utils";

interface Command {
  name: string;
  description: string;
  usage: string;
  aliases?: Array<string>;
  execute: (message: Message, args: Array<string>, client: Client) => Promise<void>;
}

declare module "discord.js" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PermissionOverwriteOption extends Partial<Record<UpdatedPermissionString, boolean | null>> { }

  type UpdatedPermissionString =
    | "CREATE_INSTANT_INVITE"
    | "KICK_MEMBERS"
    | "BAN_MEMBERS"
    | "ADMINISTRATOR"
    | "MANAGE_CHANNELS"
    | "MANAGE_GUILD"
    | "ADD_REACTIONS"
    | "VIEW_AUDIT_LOG"
    | "PRIORITY_SPEAKER"
    | "STREAM"
    | "VIEW_CHANNEL"
    | "SEND_MESSAGES"
    | "SEND_TTS_MESSAGES"
    | "MANAGE_MESSAGES"
    | "EMBED_LINKS"
    | "ATTACH_FILES"
    | "READ_MESSAGE_HISTORY"
    | "MENTION_EVERYONE"
    | "USE_EXTERNAL_EMOJIS"
    | "VIEW_GUILD_INSIGHTS"
    | "CONNECT"
    | "SPEAK"
    | "MUTE_MEMBERS"
    | "DEAFEN_MEMBERS"
    | "MOVE_MEMBERS"
    | "USE_VAD"
    | "CHANGE_NICKNAME"
    | "MANAGE_NICKNAMES"
    | "MANAGE_ROLES"
    | "MANAGE_WEBHOOKS"
    | "MANAGE_EMOJIS_AND_STICKERS"
    | "USE_APPLICATION_COMMANDS"
    | "REQUEST_TO_SPEAK"
    | "MANAGE_THREADS"
    | "CREATE_PUBLIC_THREADS"
    | "CREATE_PRIVATE_THREADS"
    | "USE_EXTERNAL_STICKERS"
    | "SEND_MESSAGES_IN_THREADS"
    | "START_EMBEDDED_ACTIVITIES";

  interface Client {
    commands: Collection<string, Command>;
    queue: Queue;
  }

  interface Channel {
    send(content: string, options?: MessageOptions): Promise<Message>;
  }
}
