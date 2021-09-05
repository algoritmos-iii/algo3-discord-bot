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

# Adding Events
If you're interested in adding events, you must know the following
## Event Handler
In order to add events, you just need to add the event file named like `<EventName>Event.ts`, respecting the `Event.ts` interface, to the Events repository.

If you want to add functionality to an already listened event, simply add it below the existing one.

> Before creating an event, you must know that you can't create an event, you must use the [existing ones](https://discord.js.org/#/docs/main/stable/class/Client), and verify that the client already satisfies the appropriate intents for that event and has the permissions in the respective guilds.

*For more information about events, checkout the [links](#Discord-API-Links) below*
### Event Interface
```typescript
export interface ExecuteFunction {
    (...args: any): Promise<void>;
}

export interface Event {
    name: string;
    once: boolean;
    execute: ExecuteFunction;
}
```

### Events repository
```
discord-bot/
├── assets
├── dist
├── node-modules
├── scripts
├── src/
|   ├── buttons
|   ├── client
|   ├── commands
|   ├── components
|   ├── events <-- HERE
|   ├── interfaces
|   ├── deploy-commands.ts
|   └── index.ts
├── tests
├── .eslintrc.json
├── .gitignore
├── babel.config.js
├── config.js
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

# Adding Commands
If you're interested in adding commands, you must know the following

## Command Handler
In order to add commands, you just need to add the event file named like `<CommandName>Event.ts`, respecting the `Command.ts` interface, to the Commands repository.

If you want to add functionality to an already registered command, simply add it below the existing one.

> Before running the client remember to run `npm run load-commands`.

*For more information about commands, checkout the [links](#Discord-API-Links) below*
### Command Interface
```typescript
export interface ExecuteFunction {
    (interaction: CommandInteraction): Promise<void>;
}

export interface Command {
    data:
        | SlashCommandBuilder
        | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
        | SlashCommandSubcommandsOnlyBuilder;
    execute: ExecuteFunction;
}

```

### Commands repository
```
discord-bot/
├── assets
├── dist
├── node-modules
├── scripts
├── src/
|   ├── buttons
|   ├── client
|   ├── commands <-- HERE
|   ├── components
|   ├── events
|   ├── interfaces
|   ├── deploy-commands.ts
|   └── index.ts
├── tests
├── .eslintrc.json
├── .gitignore
├── babel.config.js
├── config.js
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```
<!-- # Adding Buttons
If you're interested in adding interactive buttons, you must know the following

## Button Interaction Handler
### Button Interface
```typescript
export interface ExecuteFunction {
    (interaction: ButtonInteraction): Promise<void>;
}

export interface Button {
    data: MessageButton;
    execute: ExecuteFunction;
}

```

### Buttons repository
```
discord-bot/
├── assets
├── dist
├── node-modules
├── scripts
├── src/
|   ├── buttons <-- HERE
|   ├── client
|   ├── commands
|   ├── components
|   ├── events
|   ├── interfaces
|   ├── deploy-commands.ts
|   └── index.ts
├── tests
├── .eslintrc.json
├── .gitignore
├── babel.config.js
├── config.js
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
``` -->
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