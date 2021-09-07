import {
    MessageButton,
    ButtonInteraction,
    GuildMember,
    VoiceChannel,
} from 'discord.js';
import { client } from '../../index';

export const execute = async (interaction: ButtonInteraction) => {
    const member = interaction.member as GuildMember;
    if (client.queryQueue.isEmpty()) {
        await interaction.reply({
            content: 'Nadie necesita ayuda por el momento!',
            ephemeral: true,
        });
        return;
    } else if (!member.voice.channel) {
        await interaction.reply({
            content:
                'Debes estar en un canal de voz para poder atender una consulta por voz!',
            ephemeral: true,
        });
        return;
    }
    const consultee: GuildMember = client.queryQueue.next() as GuildMember;
    if (consultee.voice.channel) {
        member.voice.setChannel(consultee.voice.channel as VoiceChannel);
    } else {
        await interaction.reply({
            content:
                'El alumno que solicitó ayuda se desconectó del canal de su grupo',
            ephemeral: true,
        });
    }
    await interaction.reply({
        content: `Estás atendiendo a ${consultee.displayName}`,
        ephemeral: true,
    });
};

export const data = new MessageButton()
    .setCustomId('dequeue')
    .setLabel('Atender Próximo Grupo')
    .setStyle('PRIMARY');
