# algo3-discord-bot

# Using the bot
Clone the repository
```
git clone git@github.com:ilitteri/algo3-discord-bot.git
```

You'll need to create a `config.json` in the main directory file like this

```
{
  "clientID": "CLIENT_ID",
  "guildID": "GUILD_ID",
  "token": "CLIENT_TOKEN", // This is the client's secret token
  "docenteRoleID": "TEACHER_ROLE_ID", // This is the ID of the docente role
  "mitosisVoiceChannelID": "DONOR_VOICE_CHANNEL_ID", // This is the ID of the donor voice channel
  "mitosisCategoryID": "DONOR_CATEGORY_CHANNEL_ID", // This is the ID of the category that contains the donor voice channel
  "teachersQueryChannelID": "TEACHER_TEXT_CHANNEL_ID", // This is the ID of the text channel when you want to have the query queue page for the teachers
  "studentsQueryChannelID": "STUDENT_TEXT_CHANNEL_ID" // This is the ID of the text channel when you want to have the query queue page for the students
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