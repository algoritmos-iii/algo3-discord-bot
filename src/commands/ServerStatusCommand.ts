import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Command';

export const execute: ExecuteFunction = async (
    interaction: CommandInteraction
): Promise<void> => {
    await interaction.reply(
        `Server name: ${interaction.guild!.name}\nTotal members: ${
            interaction.guild!.memberCount
        }`
    );
};

export const data: SlashCommandBuilder = new SlashCommandBuilder()
    .setName('server')
    .setDescription('Replies with Pong!');
