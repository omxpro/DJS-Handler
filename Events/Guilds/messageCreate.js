const Embeds = require("../../Structures/Functions/Embeds");
const Event = require("../../Structures/Classes/Event");
module.exports = new Event("messageCreate", async (client, message) => {
  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith(client.config.prefix)
  )
    return;

  const [cmd, ...args] = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.get(client.aliases.get(cmd.toLowerCase()));

  if (!command) return;
  if (
    command.devOnly == true &&
    !client.config.developerIDs.includes(message.author.id)
  )
    return;

  if (command.nsfw == true && !message.channel.nsfw)
    return message.reply({
      embeds: [
        new Embeds({
          color: "RED",
          description: "This command is only for NSFW enabled channels.",
          title: "NSFW Command",
        }),
      ],
    });

  if (!message.member.permissions.has(command.userPermissions || []))
    return message.reply({
      embeds: [
        new Embeds({
          color: "RED",
          title: "You are missing some permissions.",
          fields: [
            {
              name: "Needed Permissions",
              value: `\`\`\`${command.userPermissions.join("\n")}\`\`\``,
            },
          ],
          footer: {
            text: `${client.user.tag} `,
            iconURL: client.user.displayAvatarURL(),
          },
        }),
      ],
    });

  if (!message.guild.me.permissions.has(command.botPermissions || []))
    return message.reply({
      embeds: [
        new Embeds({
          color: "RED",
          title: "I am missing some permissions.",
          fields: [
            {
              name: "Needed Permissions",
              value: `\`\`\`${command.botPermissions.join("\n")}\`\`\``,
            },
          ],
          footer: {
            text: `${client.user.tag} `,
            iconURL: client.user.displayAvatarURL(),
          },
        }),
      ],
    });

  await command.run({ client, message, args });
});
