import { REST } from '@discordjs/rest';
import { APIApplicationCommandOption, Routes } from 'discord-api-types/v9';
import { clientID, guildID, token } from '../config.json';
import { Command } from './interfaces/Command';

import fs from 'fs';
import path from 'path';
import consola from 'consola';

const commands: {
    name: string;
    description: string;
    options: APIApplicationCommandOption[];
    default_permission: boolean | undefined;
}[] = [];

const commandFiles: string[] = fs
    .readdirSync(path.resolve(__dirname, 'commands'))
    .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const command: Command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        consola.info('Started refreshing application (/) commands.');

        await rest.put(
            // Routes.applicationCommands(clientID), // For global commands
            Routes.applicationGuildCommands(clientID, guildID),
            { body: commands }
        );

        consola.success('Successfully reloaded application (/) commands.');
    } catch (error) {
        consola.error(error);
    }
})();
