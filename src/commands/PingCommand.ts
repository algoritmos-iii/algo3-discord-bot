import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Command';

export const execute: ExecuteFunction = async (
    interaction: CommandInteraction
): Promise<void> => {
    await interaction.reply(`Pong!`);
};

export const data: SlashCommandBuilder = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');
