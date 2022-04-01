const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const ExtendedClient = require("../Client");
const { default: chalk } = require("chalk");
const SlashCommand = require("../Classes/SlashCommand");

module.exports = class requireSlashCommands {
  /**
   * Requires all the legacy commands
   * @param {ExtendedClient} client
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * @param {{ commands: import("discord.js").ApplicationCommandDataResolvable[], guildId: string }}
   */
  async registerCommands({ commands, guildId }) {
    if (guildId) {
      this.client.guilds.cache.get(guildId)?.commands.set(commands);
      console.log(
        `[ ${chalk.green.bold("CLIENT")} ] Loaded Slash Commands To: ${
          this.client.guilds.cache.get(guildId).name
        }`
      );
    } else {
      this.client.application?.commands.set(commands);
      console.log(
        `[ ${chalk.green.bold("CLIENT")} ] Loaded Slash Commands Globally`
      );
    }
  }

  async getSlashCommands() {
    console.log(chalk.white.bold(`━━━━━━━━━━━━━━━━━━━━━[ Slash Commands ]`));
    /**
     * @type {import("discord.js").ApplicationCommandDataResolvable[]}
     */
    let slashCommands = [];
    let slashCommandFiles = await globPromise(
      `${__dirname}/../../SlashCommands/**/*.js`
    );
    slashCommandFiles.map(async (filePath) => {
      /**
       * @type {SlashCommand}
       */
      let file = await require(filePath);
      if (!file?.name)
        console.log(`[ ${chalk.green.bold("COMMANDS")} ] Failed: Missing`);
      if (file.name) {
        this.client.slashCommands.set(file.name, file);
        slashCommands.push(file);
        console.log(`[ ${chalk.green.bold("COMMANDS")} ] Loaded: ${file.name}`);
      }
    });

    this.client.on("ready", async () => {
      console.log(chalk.white.bold(`━━━━━━━━━━━━━━━━━━━━━[ CLient ]`));
      await this.registerCommands({
        commands: slashCommands,
      });
    });
  }
};
