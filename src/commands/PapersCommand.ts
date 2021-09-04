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
    const interactionOptionValue = interaction.options.getString('paper');

    const paperLinkButton = new MessageButton().setStyle('LINK');

    // TODO: Scrap this links
    if (interactionOptionValue === 'PAT') {
        paperLinkButton
            .setURL(
                'https://algoritmos-iii.github.io/assets/bibliografia/programming-as-theory-building.pdf'
            )
            .setLabel('Programming as Theory Building');
    } else if (interactionOptionValue === 'NSB') {
        paperLinkButton
            .setURL(
                'https://algoritmos-iii.github.io/assets/bibliografia/no-silver-bullet.pdf'
            )
            .setLabel('No Silver Bullet');
    } else if (interactionOptionValue === 'DPBS') {
        paperLinkButton
            .setURL(
                'https://www.cs.virginia.edu/~evans/cs655/readings/smalltalk.html'
            )
            .setLabel('Design Principles Behind Smalltalk');
    } else if (interactionOptionValue === 'ASTFHMP') {
        paperLinkButton
            .setURL(
                'https://algoritmos-iii.github.io/assets/bibliografia/simple-technique-for-handling-multiple-polymorphism.pdf'
            )
            .setLabel('A Simple Technique for Handling Multiple Polimorphism');
    } else if (interactionOptionValue === 'NOP') {
        paperLinkButton
            .setURL(
                'https://algoritmos-iii.github.io/assets/bibliografia/null-object-pattern.pdf'
            )
            .setLabel('Null Object Pattern');
    } else if (interactionOptionValue === 'TORP') {
        paperLinkButton
            .setURL(
                'https://algoritmos-iii.github.io/assets/bibliografia/object-recusion-pattern.pdf'
            )
            .setLabel('The Object Recursion Pattern');
    } else if (interactionOptionValue === 'MO') {
        paperLinkButton
            .setURL(
                'https://algoritmos-iii.github.io/assets/bibliografia/object-recusion-pattern.pdf'
            )
            .setLabel('Method Object');
    } else if (interactionOptionValue === 'DPI') {
        paperLinkButton
            .setURL(
                'https://algoritmos-iii.github.io/assets/bibliografia/intro-design-patterns.pdf'
            )
            .setLabel('Design Patterns Introduction');
    } else if (interactionOptionValue === 'FF') {
        paperLinkButton
            .setURL(
                'https://algoritmos-iii.github.io/assets/bibliografia/fail-fast.pdf'
            )
            .setLabel('Fail Fast');
    }

    const row = new MessageActionRow().addComponents(paperLinkButton);

    await interaction.user.send({
        content: 'Este enlace durarará ...',
        components: [row],
    });
};

export const data: Omit<
    SlashCommandBuilder,
    'addSubcommand' | 'addSubcommandGroup'
> = new SlashCommandBuilder()
    .setName('papers')
    .setDescription('Send you a link')
    .addStringOption((option) =>
        option
            .setName('paper')
            .setDescription('Paper List')
            .setRequired(true)
            .addChoice('Programming as Theory Building', 'PAT')
            .addChoice('No Silver Bullet', 'NSB')
            .addChoice('Design Principles Behind Smalltalk', 'DPBS')
            .addChoice(
                'A Simple Technique for Handling Multiple Polymorphism',
                'ASTFHMP'
            )
            .addChoice('Null Object Pattern', 'NOP')
            .addChoice('The Object Recursion Pattern', 'TORP')
            .addChoice('Method Object', 'MO')
            .addChoice('Design Patterns Introduction', 'DPI')
            .addChoice('Fail Fast', 'FF')
    );
