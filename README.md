# algo3-discord-bot

# Using the bot
Clone the repository
```
git clone git@github.com:ilitteri/algo3-discord-bot.git
```

You'll need to create a `config.json` in the main directory file like this

```
{
  "clientID": "YOUR_CLIENT_ID",
  "guildID": "YOUR_GUILD_ID",
  "token": "YOUR_CLIENT_TOKEN"
}

```

> In order to get your client and guild ids, open Discord and go to your settings. On the "Advanced" page, turn on "Developer Mode". This will enable a "Copy ID" button in the context menu when you right-click on a server icon, a user's profile, etc.

Once you have the `config.json` file we need to install the dependencies

```
npm install
```
Before running the client we need run `npm run load-commands` once. You should only run it again if you add or edit existing commands.

Finally, to run the client
```
npm run dev
```

# Discord API Links

- [Website](https://discord.js.org/) ([source](https://github.com/discordjs/website))
- [Documentation](https://discord.js.org/#/docs)
- [Guide](https://discordjs.guide/) ([source](https://github.com/discordjs/guide))
  See also the [Update Guide](https://discordjs.guide/additional-info/changes-in-v13.html), including updated and removed items in the library.
- [Discord.js Discord server](https://discord.gg/djs)
- [Discord API Discord server](https://discord.gg/discord-api)
- [GitHub](https://github.com/discordjs/discord.js)
- [NPM](https://www.npmjs.com/package/discord.js)
- [Related libraries](https://discord.com/developers/docs/topics/community-resources#libraries)