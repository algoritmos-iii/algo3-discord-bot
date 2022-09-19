# algo3-discord-bot

# Using the bot
Clone the repository

```
git clone git@github.com:ilitteri/algo3-discord-bot.git
```

## Run

Before running ensure you have a `.env` file like `.env.example`.

```

### With Docker

```
make run_docker ENV=.env
```

The directive above has an optional argument `ENV` which is the path to the environment file. If not provided, it will default to `.env`.

### Without Docker

```
make run
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
