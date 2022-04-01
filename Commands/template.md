## Command Template

```js
const Command = require("../../Structures/Classes/Command");

module.exports = new Command({
  name: "", // Needed
  description: "", // Needed
  category: "", // Needed
  aliases: [""], // Optional
  usage: "", // Optional
  devOnly: false, // Optional
  nsfw: false, // optional
  botPermissions: [], // Optional
  userPermissions: [], // Optional
  run: async ({  }) => {} // Needed
});
```