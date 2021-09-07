import { ButtonInteraction, GuildMember, MessageButton } from 'discord.js';
import { client } from '../../index';

export const execute = async (interaction: ButtonInteraction) => {
    const member = interaction.member as GuildMember;
    const validatedRole = member.guild.roles.cache.find(
        (role) => role.id === client.config.studentRoleID
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
    .setLabel('Juro solemnemente haber leído este mensaje')
    .setStyle('SUCCESS');
