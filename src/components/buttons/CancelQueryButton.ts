import {
    ButtonInteraction,
    GuildMember,
    MessageButton,
    TextChannel,
} from 'discord.js';
import { client } from '../../index';

export const execute = async (interaction: ButtonInteraction) => {
    const member = interaction.member as GuildMember;
    const group = member.roles.cache.find((role) =>
        role.name.startsWith('Grupo')
    );

    if (!client.queryQueue.has(member)) {
        await interaction.reply({
            content: 'No estás en la cola de espera!',
            ephemeral: true,
        });
        return;
    }
    client.queryQueue.splice(client.queryQueue.indexOf(member), 1);
    await interaction.reply({
        content: 'Has sido removido de la cola de espera!',
        ephemeral: true,
    });

    const queryLogTextChannel = interaction.guild!.channels.cache.find(
        (channel) => channel.id === client.config.queryLogTextChannelID
    ) as TextChannel;
    await queryLogTextChannel!.send(
        `:no_entry: ${
            group ? 'El ' + group.name : member.displayName
        } desestimó la consulta.`
    );
};

export const data = new MessageButton()
    .setCustomId('out')
    .setLabel('Cancelar Consulta')
    .setStyle('DANGER');
