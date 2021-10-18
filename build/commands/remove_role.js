export default {
    name: "rmrole",
    description: "Removes a role from a user.",
    usage: "rmrole <user> <role name>",
    execute: (message, args) => {
        if (message.member.id != "414196720101228545")
            if (!message.member.hasPermission("MANAGE_ROLES"))
                return message.reply("You don't have permission to do that!");
        if (args.length < 2)
            return message.channel.send("You didn't provide enough arguments.");
        const user = message.mentions.users.first();
        const member = message.guild.member(user);
        if (!user || !member)
            return message.channel.send("Couldn't find that user.");
        const role = message.guild.roles.cache.find(r => r.name === args[1]);
        if (member.roles.cache.find(r => r.name === args[1])) {
            member.roles.remove(role)
                .catch(() => {
                console.error;
                return message.channel.send("An error occurred.");
            });
        }
        else
            message.channel.send("This member don't have this role!");
        return message.channel.send(`Removed role ${role} from ${user.username}`);
    }
};
