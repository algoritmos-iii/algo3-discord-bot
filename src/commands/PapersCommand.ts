import {
    SlashCommandBuilder,
    SlashCommandStringOption,
} from '@discordjs/builders';
import {
    CommandInteraction,
    MessageActionRow,
    MessageButton,
} from 'discord.js';
import { ExecuteFunction } from '../interfaces/Command';
import * as links from '../../assets/bibliography_links.json';

export const execute: ExecuteFunction = async (
    interaction: CommandInteraction
): Promise<void> => {
    const interactionOptionValue = interaction.options.getString('paper')!;
    let url =
        'https://github.com/algoritmos-iii/algoritmos-iii.github.io/tree/master/assets/bibliografia';

    for (let index in links) {
        const paper = links[index];
        if (index != 'default' && paper.name === interactionOptionValue) {
            url = paper.url;
            break;
        }
    }

    const paperLinkButton = new MessageButton()
        .setStyle('LINK')
        .setURL(url)
        .setLabel(interactionOptionValue);

    const row = new MessageActionRow().addComponents(paperLinkButton);

    await interaction.user.send({
        content: 'Este enlace durarará ...',
        components: [row],
    });

    await interaction.reply('Que lo disfrutes!');
};

function addChoicesToOptions(
    option: SlashCommandStringOption
): SlashCommandStringOption {
    for (let index in links) {
        const paper = links[index];
        if (index != 'default') {
            option = option.addChoice(paper.name, paper.name);
        }
    }
    return option;
}

export const data = new SlashCommandBuilder()
    .setName('papers')
    .setDescription('Send you a link')
    .addStringOption((option) =>
        addChoicesToOptions(option)
            .setName('paper')
            .setDescription('Paper List')
            .setRequired(true)
    );
