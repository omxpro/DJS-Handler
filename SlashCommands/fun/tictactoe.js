const SlashCommand = require("../../Structures/Classes/SlashCommand");
const TTT = require("discord-tictactoe");
const game = new TTT({ language: "en", commandOptionName: "player2" });

module.exports = new SlashCommand({
  name: "tictactoe",
  description: "Play a game of ticatactoe.",
  options: [
    {
      name: "player2",
      description: "Play against this user.",
      type: "USER",
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    game.handleInteraction(interaction)
  },
});
