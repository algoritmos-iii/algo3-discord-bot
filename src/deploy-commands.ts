import { REST } from '@discordjs/rest';
import { APIApplicationCommandOption, Routes } from 'discord-api-types/v9';
import { Command } from './interfaces/Command';
import fs from 'fs';
import path from 'path';
import consola from 'consola';
import * as commandFiles from './commands/index.ts';

import dotenv from 'dotenv';
dotenv.config();

const commands: {
    name: string;
    description: string;
    options: APIApplicationCommandOption[];
    default_permission: boolean | undefined;
}[] = [];


Object.values(commandFiles).forEach(command => {
    commands.push(command.data.toJSON());
});

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN as string);

(async () => {
    try {
        consola.info('Started refreshing application (/) commands.');

        await rest.put(
            // Routes.applicationCommands(process.env.CLIENT_ID as string), // For global commands
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID as string,
                process.env.GUILD_ID as string
            ),
            { body: commands }
        );

        consola.success('Successfully reloaded application (/) commands.');
    } catch (error) {
        consola.error(error);
    }
})();
