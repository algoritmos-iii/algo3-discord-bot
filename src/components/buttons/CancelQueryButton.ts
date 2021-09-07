import { ButtonInteraction, GuildMember, MessageButton } from 'discord.js';
import { client } from '../../index';

export const execute = async (interaction: ButtonInteraction) => {
    const member = interaction.member as GuildMember;
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
};

export const data = new MessageButton()
    .setCustomId('out')
    .setLabel('Cancelar Consulta')
    .setStyle('DANGER');
