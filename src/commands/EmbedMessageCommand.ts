import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';

export const execute = async (
    interaction: CommandInteraction
): Promise<void> => {
    const title = interaction.options.data[0].value as string;
    const description = interaction.options.data[1];
    const titleURL = interaction.options.data[2];
    const imageURL = interaction.options.data[3];

    const embed = new MessageEmbed()
        .setTitle(title)
        .setAuthor(
            `${interaction.user.username}`,
            `${interaction.user.avatarURL()}`
        );

    if (description) {
        embed.setDescription(description.value as string);
    }

    if (titleURL) {
        embed.setURL(titleURL.value as string);
    }

    if (imageURL) {
        embed.setImage(imageURL.value as string);
    }

    await interaction.reply({ embeds: [embed] });
};

export const data = new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Escribí lo que querés decir, pero más lindo')
    .addStringOption((titleOption) =>
        titleOption
            .setName('título')
            .setDescription('El título del embed')
            .setRequired(true)
    )
    .addStringOption((descriptionOption) =>
        descriptionOption
            .setName('descripción')
            .setDescription('La descripción del embed')
    )
    .addStringOption((titleUrlOption) =>
        titleUrlOption
            .setName('url_para_título')
            .setDescription('Si querés que el título tenga URL')
    )
    .addStringOption((imageOption) =>
        imageOption.setName('imágen').setDescription('Link a una imágen')
    );
