const { default: chalk } = require("chalk");
const { default: mongoose } = require("mongoose");

module.exports = class Mongoose {
  /**
   * @param {string} connectionString
   */
  constructor(connectionString) {
    if (!connectionString) return;
    mongoose
      .connect(connectionString)
      .then(() =>
        console.log(`[ ${chalk.green.bold("DATABASE")} ] Connection: Connected`)
      )
      .catch(() =>
        console.log(`[ ${chalk.green.bold("DATABASE")} ] Connection: Error`)
      );
  }
};
