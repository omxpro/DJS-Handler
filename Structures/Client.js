const { Client, Collection } = require("discord.js");
const { colors } = require("./Config/colors");
const { config } = require("./Config/config");
const Command = require("./Classes/Command.js");
const SlashCommand = require("./Classes/SlashCommand");
const { GatewayIntentBits } = require("discord-api-types/gateway/v9");
const requireCommands = require("./Utils/Command");
const requireSlashCommands = require("./Utils/SlashCommands");
const requireEvents = require("./Utils/Events");
const Mongoose = require("./Utils/Mongoose");

class ExtendedClient extends Client {
  /** @type {Collection<string, Command>} */
  commands = new Collection();
  /** @type {Collection<string, string>} */
  aliases = new Collection();
  /** @type {Collection<string, SlashCommand>} */
  slashCommands = new Collection();
  config = config;
  colors = colors;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildVoiceStates,
      ],
      allowedMentions: {
        repliedUser: false,
      },
    });
  }
  async start() {
    this.login(this.config.token)
    await new requireCommands(this).getCommands()
    await new requireSlashCommands(this).getSlashCommands()
    await new requireEvents(this).getEvents()
    new Mongoose(this.config.mongooseConnectionString)
  }
}

module.exports = ExtendedClient;
