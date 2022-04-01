const SlashCommand = require("../../Structures/Classes/SlashCommand");
const Event = require("../../Structures/Classes/Event");
const Embeds = require("../../Structures/Functions/Embeds");

module.exports = new Event("interactionCreate", async (client, interaction) => {
  if (interaction.isCommand()) {
    /**
     * @type {SlashCommand}
     */
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.reply({ content: "An error has occured 😢" });

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }

    if (
      cmd.devOnly == true &&
      !client.config.developerIDs.includes(interaction.user.id)
    )
      return interaction.reply({
        embeds: [
          new Embeds({
            color: "RED",
            title: "You are not the developer.",
            description: "This command can only be run buy the developer",
            footer: {
              text: `${client.user.tag} `,
              iconURL: client.user.displayAvatarURL(),
            },
          }),
        ],
        ephemeral: true,
      });

    if (!interaction.memberPermissions.has(cmd.userPermissions || []))
      return interaction.reply({
        embeds: [
          new Embeds({
            color: "RED",
            title: "You are missing some permissions.",
            fields: [
              {
                name: "Needed Permissions",
                value: `\`\`\`${cmd.userPermissions.join("\n")}\`\`\``,
              },
            ],
            footer: {
              text: `${client.user.tag} `,
              iconURL: client.user.displayAvatarURL(),
            },
          }),
        ],
        ephemeral: true,
      });

    if (!interaction.guild.me.permissions.has(cmd.botPermissions || []))
      return interaction.reply({
        embeds: [
          new Embeds({
            color: "RED",
            title: "I am missing some permissions.",
            fields: [
              {
                name: "Needed Permissions",
                value: `\`\`\`${cmd.botPermissions.join("\n")}\`\`\``,
              },
            ],
            footer: {
              text: `${client.user.tag} `,
              iconURL: client.user.displayAvatarURL(),
            },
          }),
        ],
        ephemeral: true,
      });

    await cmd.run({ client, interaction, args });
  }
});
