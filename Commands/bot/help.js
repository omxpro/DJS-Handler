const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton,
} = require("discord.js");
const Command = require("../../Structures/Classes/Command");
const Embeds = require("../../Structures/Functions/Embeds");

module.exports = new Command({
  name: "help",
  description: "View all the bots command",
  aliases: ["h", "cmd", "cmds"],
  category: "bot",
  botPermissions: ["ADMINISTRATOR"],
  usage: "<command>",
  run: async ({ client, message, args }) => {
    const prefix = client.config.prefix;
    if (!args.length) {
      const emojis = {
        bot: "🤖",
        information: "❔",
        fun: "🎈",
      }; // Command Directory Emojis

      const ignored = []; //The categories you want to ignore.
      const directories = [
        ...new Set(
          client.commands
            .filter((cmd) => !ignored?.includes(cmd.directory))
            .map((cmd) => cmd.directory)
        ),
      ];

      const formattedString = (string) =>
        `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;

      const categories = directories.map((dir) => {
        const getCommands = client.commands
          .filter((cmd) => cmd.directory === dir)
          .map((cmd) => {
            return {
              name: cmd.name || "No Command Name.",
              description: cmd.description || "No Command Description.",
            };
          });

        return {
          directory: formattedString(dir),
          commands: getCommands,
        };
      });

      const initEmbed = new MessageEmbed()
        .setTitle("Help Command")
        .setDescription("```Please Choose a Command Category Below.```")
        .setColor("RANDOM");

      const components = (state) => [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("home")
            .setDisabled(state)
            .setEmoji("📄")
            .setLabel("Home")
            .setStyle("PRIMARY"),
          new MessageButton()
            .setCustomId("all-commands")
            .setDisabled(state)
            .setEmoji("📜")
            .setLabel("All Commands")
            .setStyle("PRIMARY"),
          new MessageButton()
            .setCustomId("delete")
            .setDisabled(state)
            .setEmoji("🗑️")
            .setLabel("Delete Menu")
            .setStyle("DANGER"),
        ),

        new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("help-menu")
            .setDisabled(state)
            .setPlaceholder("📬 Choose a category here")
            .setOptions(
              categories.map((cmd) => {
                return {
                  label: cmd.directory,
                  value: cmd.directory.toLowerCase(),
                  description: `Commands From ${cmd.directory}`,
                  emoji: emojis[cmd.directory.toLowerCase()] || null,
                };
              })
            )
        ),
      ];

      const filter = (interaction) => {
        if (interaction.user.id === message.author.id) return true;
        else
          return void interaction.reply({
            content: "This help menu is not for you.",
            ephemeral: true,
          });
      };

      let initMessage = await message.reply({
        embeds: [initEmbed],
        components: components(false),
      });

      const collector = initMessage.createMessageComponentCollector({
        filter,
      });

      collector.on("collect", (interaction) => {
        if (interaction.isSelectMenu()) {
          if (interaction.customId === "help-menu") {
            const [directory] = interaction.values;
            const category = categories.find(
              (x) => x.directory.toLowerCase() === directory
            );

            const updateEmbed = new MessageEmbed()
              .setTitle(`Commands from ${category.directory}`)
              .addFields(
                category.commands.map((cmd) => {
                  return {
                    name: `\`${prefix}${cmd.name}\``,
                    value: `${cmd.description}`,
                    inline: true,
                  };
                })
              )
              .setColor("RANDOM")
              .setTimestamp();

            interaction.update({ embeds: [updateEmbed] });
          }
        }

        if (interaction.isButton()) {
          if (interaction.customId === "delete") {
            initMessage.delete();
          }
          if (interaction.customId === "all-commands") {
            const commands = categories.map((cmd) => {
              return {
                name: `${emojis[cmd.directory.toLowerCase()]} ${cmd.directory}`,
                value: `${cmd.commands.map((cmd) => `\`${cmd.name}\``).join(", ")}`,
                inline: false
              }
            })

            const all = new MessageEmbed()
              .setDescription(`Need Help?, use \`${prefix}help\` and select from the dropdown menu, for more command information use \`${prefix}help <command>\``)
              .addFields(commands)
              .setColor("RANDOM")
            interaction.update({ embeds: [all] })
          }
        }

        if (interaction.customId === "home") {
          interaction.update({ embeds: [initEmbed] })
        }
      });
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.get(client.aliases.get(args[0].toLowerCase()));

      if (!command)
        return message.reply({ embeds: [new Embeds({
          title: "Invalid Command",
          description: `\`${args.join(
            " "
          )}\` is not a valid command use \`${prefix}help\` to see all my valid commands.`,
          color: "RED",
        })] })

      const commandInformation = new MessageEmbed()
        .setTitle(`${command.name.toUpperCase()} INFORMATION`)
        .setDescription(
          `\`\`\`Name: ${command.name ? command.name : "No Name"}
Description: ${command.description ? command.description : "No Description"}
Category: ${command.category ? command.category : "No Category"}
Usage: ${
            command.usage
              ? `${prefix}${command.name} ${command.usage}`
              : "No Usage"
          };
Aliases: ${command.aliases ? command.aliases.join(", ") : "No Aliases"}
Permissions:
\tUser: ${
            command.userPermissions
              ? command.userPermissions
                  .join("\n")
                  .toLowerCase()
                  .replace(/\_/g, " ")
              : "Permissions Are Not Needed"
          }
\tMe: ${
            command.botPermissions
              ? command.botPermissions
                  .join("\n")
                  .toLowerCase()
                  .replace(/\_/g, " ")
              : "Permissions Are Not Needed"
          }\`\`\`
        `
        )
        .setFooter({
          iconURL: client.user.displayAvatarURL(),
          text: `${client.user.username}`,
        });
      message.reply({ embeds: [commandInformation] });
    }
  },
});
