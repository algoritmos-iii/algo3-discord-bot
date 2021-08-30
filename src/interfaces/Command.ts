import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

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
