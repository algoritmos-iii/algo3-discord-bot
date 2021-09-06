import { ButtonInteraction, GuildMember, MessageButton } from 'discord.js';
import { client } from '../index';

export const execute = async (interaction: ButtonInteraction) => {
    const member = interaction.member as GuildMember;
    const validatedRole = member.guild.roles.cache.find(
        (role) => role.id === client.config.validatedRoleID
    )!;
    if (member.roles.cache.has(validatedRole.id)) {
        return;
    }
    await member.roles.add(validatedRole).catch(client.logger.error);
    await interaction.reply({
        content: 'Gracias por leer!, cualquier duda no temas en consultar!',
        ephemeral: true,
    });
};

export const data = new MessageButton()
    .setCustomId('readme')
    .setLabel('Juro solemnemente que leí este mensaje')
    .setStyle('SUCCESS');
