const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../Structures/Classes/SlashCommand");

module.exports = new SlashCommand({
  name: "ratemachine",
  options: [
    {
      name: "peepee",
      description: "How big is your pp?",
      type: "SUB_COMMAND",
      options: [
        {
          name: "user",
          type: "USER",
          description: "User",
          required: true,
        },
      ],
    },
    {
      name: "dank",
      description: "How dank are you?",
      type: "SUB_COMMAND",
      options: [
        {
          name: "user",
          description: "User",
          type: "USER",
          required: true,
        },
      ],
    },
    {
      name: "epicgamer",
      description: "How much of an epic gamer are you?",
      type: "SUB_COMMAND",
      options: [
        {
          name: "user",
          description: "User",
          type: "USER",
          required: true,
        },
      ],
    },
    {
      name: "simp",
      description: "How much of a simp are you?",
      type: "SUB_COMMAND",
      options: [
        {
          name: "user",
          description: "User",
          type: "USER",
          required: true,
        },
      ],
    },
    {
      name: "stank",
      description: "How stanky are you?",
      type: "SUB_COMMAND",
      options: [
        {
          name: "user",
          description: "User",
          type: "USER",
          required: true,
        },
      ],
    },
    {
      name: "thot",
      description: "How thotty are you?",
      type: "SUB_COMMAND",
      options: [
        {
          name: "user",
          description: "User",
          type: "USER",
          required: true,
        },
      ],
    },
    {
      name: "gay",
      description: "How gay are you?",
      type: "SUB_COMMAND",
      options: [
        {
          name: "user",
          description: "User",
          type: "USER",
          required: true,
        },
      ],
    },
  ],
  description: "The Rate Machine",
  run: async ({ interaction, args }) => {
    const sub = interaction.options.getSubcommand();
    const user = interaction.options.getUser("user");
    const member = await interaction.guild.members.fetch({ user: user.id });
    if (!member)
      return interaction.reply({
        content: "That is not a member in this server!",
        ephemeral: true,
      });

    if (sub === "peepee") {
      const random = Math.floor(Math.random() * (110 - 1)) + 1;
      const embed = new MessageEmbed()
        .setTitle("peepee r8 machine")
        .setDescription(
          `
        ${user.username}'s penis
        8${repeat("=", random)}D
        `
        )
        .setColor("RANDOM");
      interaction.reply({ embeds: [embed] });
    }
    if (sub === "dank") {
      const random = Math.floor(Math.random() * (100 - 1)) + 1;
      const embed = new MessageEmbed()
        .setTitle("dank r8 machine")
        .setDescription(`${user.username} is ${random}% dank`)
        .setColor("RANDOM");
      interaction.reply({ embeds: [embed] });
    }
    if (sub === "epicgamer") {
      const random = Math.floor(Math.random() * (100 - 1)) + 1;
      const embed = new MessageEmbed()
        .setTitle("epic gamer r8 machine")
        .setDescription(`${user.username} is ${random}/100 an epic gamer`)
        .setColor("RANDOM");
      interaction.reply({ embeds: [embed] });
    }
    if (sub === "simp") {
      const random = Math.floor(Math.random() * (100 - 1)) + 1;
      const embed = new MessageEmbed()
        .setTitle("simp r8 machine")
        .setDescription(`${user.username} is ${random}% simp`)
        .setColor("RANDOM");
      interaction.reply({ embeds: [embed] });
    }
    if (sub === "stank") {
      const random = Math.floor(Math.random() * (100 - 1)) + 1;
      const embed = new MessageEmbed()
        .setTitle("simp r8 machine")
        .setDescription(`${user.username} is ${random}% stanky`)
        .setColor("RANDOM");
      interaction.reply({ embeds: [embed] });
    }

    if (sub === "thot") {
      const random = Math.floor(Math.random() * (100 - 1)) + 1;
      const embed = new MessageEmbed()
        .setTitle("simp r8 machine")
        .setDescription(`${user.username} is ${random}% thotty`)
        .setColor("RANDOM");
      interaction.reply({ embeds: [embed] });
    }

    if (sub === "gay") {
      const random = Math.floor(Math.random() * (100 - 1)) + 1;
      const embed = new MessageEmbed()
        .setTitle("simp r8 machine")
        .setDescription(`${user.username} is ${random}% gay 🏳️‍🌈`)
        .setColor("RANDOM");
      interaction.reply({ embeds: [embed] });
    }

    /**
     * @param {string} char
     * @param {number} num
     * @returns
     */
    function repeat(char, num) {
      return char.repeat(num / 10);
    }
  },
});
