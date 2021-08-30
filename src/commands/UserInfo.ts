import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Command';

export const execute: ExecuteFunction = async (
    interaction: CommandInteraction
): Promise<void> => {
    await interaction.reply(
        `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
    );
};

export const data: SlashCommandBuilder = new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with Pong!');
