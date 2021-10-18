import { MessageEmbed } from "discord.js";

//TODO: faze direito essa merda

// export default {
//   name: "ping",
//   description: "Show latency",
//   usage: "ping",
//   execute(message, args, client) {
//     return message.channel.send(
//       new MessageEmbed()
//         .setTitle("Pong!")
//         .setDescription(
//           `Latency: ${client.ws.ping}ms`
//         )
//         .setColor("#90F1EF")
//     )
//   }
// };

// export default {
//   client.on('message', message => {
//     if (message.content === prefix + 'ping') {
//     message.channel.send('Loading data').then (async (msg) =>{
//       msg.delete()
//       message.channel.send(`🏓Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
//     })
//     }
//   });
// }