import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Command';

export const execute: ExecuteFunction = async (
    interaction: CommandInteraction
): Promise<void> => {
    await interaction.reply(`Gif!`);
};

export const data: Omit<
    SlashCommandBuilder,
    'addSubcommand' | 'addSubcommandGroup'
> = new SlashCommandBuilder()
    .setName('gif')
    .setDescription('Sends a random gif!')
    .addStringOption((option) =>
        option
            .setName('category')
            .setDescription('The gif category')
            .setRequired(true)
            .addChoice('Funny', 'gif_funny')
            .addChoice('Meme', 'gif_meme')
            .addChoice('Movie', 'gif_movie')
    );
