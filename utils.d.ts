export function info(text: string): void;
export function warn(text: string): void;
export function error(text: string): void;

export function update_chat(id: string, log: boolean): string | void;
export function log_message(chat: string, user: string, message: string): void;
export function send_bot_message(message: string): void;

export function set(): void;
export function set_chat(id: string): void;
export function set_category(args: Array<string>): void;

export function get(): void;
export function get_chat(): void;

export function debug(mode: "on" | "off"): void;
export function help(): void;

export function clear(): void;
export function exit(exit_code: number): void;