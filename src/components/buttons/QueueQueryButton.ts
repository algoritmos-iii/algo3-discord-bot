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
    if (client.queryQueue.indexOf(member) != -1) {
        await interaction.reply({
            content: 'Ya estás en la cola de espera!',
            ephemeral: true,
        });
        return;
    } else if (
        !member.voice.channel ||
        member.voice.channel.parentId !== client.config.mitosisCategoryID
    ) {
        await interaction.reply({
            content:
                'Debes estar en un canal de voz de grupo para poder usar este botón!',
            ephemeral: true,
        });
        return;
    }
    if (group) {
        if (client.queryQueue.hasSomeMemberOf(group)) {
            await interaction.reply({
                content: 'Ya hay alguien de tu grupo en la cola de espera!',
                ephemeral: true,
            });
            return;
        }
    }
    client.queryQueue.enqueue(member);
    await interaction.reply({
        content: 'Has sido puesto en la cola de espera!',
        ephemeral: true,
    });

    const teachersTextChannel = interaction.guild!.channels.cache.find(
        (channel) => channel.id === client.config.teachersTextChannelID
    ) as TextChannel;
    await teachersTextChannel!.send(
        `${member.displayName} (${
            group ? group.name : 'sin grupo'
        }) necesita ayuda en un canal de voz`
    );
};

export const data = new MessageButton()
    .setCustomId('queue')
    .setLabel('Pedir Ayuda')
    .setStyle('PRIMARY');
