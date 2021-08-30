import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Command';

export const execute: ExecuteFunction = async (
    interaction: CommandInteraction
): Promise<void> => {
    await interaction.reply(
        `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
    );
};

export const data: SlashCommandSubcommandsOnlyBuilder =
    new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get info about a user or a server!')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption((option) =>
                    option.setName('target').setDescription('The user')
                )
        )
        .addSubcommand((subcommand) =>
            subcommand.setName('server').setDescription('Info about the server')
        );
