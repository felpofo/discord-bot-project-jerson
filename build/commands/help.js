var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MessageEmbed } from "discord.js";
export default {
    name: "help",
    description: "Get help on a command",
    usage: "help [command]",
    execute: (message, _args, client) => __awaiter(void 0, void 0, void 0, function* () {
        const commands = Object.keys(client.commands);
        return yield message.channel.send(new MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Help")
            .setDescription(commands.map((value) => {
            value;
        })));
    })
};
