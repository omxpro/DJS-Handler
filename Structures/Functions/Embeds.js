const { MessageEmbed } = require("discord.js");

class Embeds extends MessageEmbed {
	/** @param {import("../Typescript/Embeds").embedOptions} options */
	constructor(options) {
		super({
			author: options.author,
			color: options.color,
			description: options.description,
			fields: options.fields,
			footer: options.footer,
			image: options.image,
			thumbnail: options.thumbnail,
			title: options.title,
			url: options.url,
		})
	}
};

module.exports = Embeds