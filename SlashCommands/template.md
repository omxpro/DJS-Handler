## Slash Command Template

```js
const SlashCommand = require("../../Structures/Classes/SlashCommand");

module.exports = new SlashCommand({
  name: "", // Needed
  description: "", // Needed
  type: "CHAT_INPUT", // Optional
  botPermissions: [], // Optional
  userPermissions: [], // Optional
  defaultPermission: false, // Optional
  options: [], // Optional
  devOnly: false, // Optional
  run: async ({}) => {} // Needed
})
```

## DO NOT USE
- for sending messages: `interaction.followUp` or `interaction.channel.send`
