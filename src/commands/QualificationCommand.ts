import { SlashCommandBuilder } from '@discordjs/builders';
import {
    CommandInteraction,
    MessageActionRow,
    MessageButton,
} from 'discord.js';
import { ExecuteFunction } from '../interfaces/Command';

export const execute: ExecuteFunction = async (
    interaction: CommandInteraction
): Promise<void> => {
    const row = new MessageActionRow().addComponents(
        new MessageButton()
            .setLabel('Notas')
            .setStyle('LINK')
            .setURL('https://github.com/algoritmos-iii/algo3_notas')
    );
    await interaction.user.send({
        content: 'Este enlace durarará ...',
        components: [row],
    });
};

export const data: Omit<
    SlashCommandBuilder,
    'addSubcommand' | 'addSubcommandGroup'
> = new SlashCommandBuilder()
    .setName('notas')
    .setDescription('Send you a link')
    .addStringOption((option) =>
        option
            .setName('email')
            .setDescription('FIUBA Email Category')
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName('padrón')
            .setDescription('Padron Category')
            .setRequired(true)
    );
