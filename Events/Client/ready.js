const Event = require("../../Structures/Classes/Event");
const { default: chalk } = require("chalk");

module.exports = new Event("ready", (client) => {
  console.log(
    `[ ${chalk.green.bold("CLIENT")} ] Logged in as: ${client.user.tag}`
  );

  client.user.setActivity({
    name: `${client.config.prefix}help`,
    type: "WATCHING",
  });
});