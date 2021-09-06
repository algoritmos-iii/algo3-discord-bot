import { ButtonInteraction, GuildMember, MessageButton } from 'discord.js';
import { client } from '../index';

export const execute = async (interaction: ButtonInteraction) => {
    const member = interaction.member as GuildMember;
    if (!client.queryQueue.has(member)) {
        await interaction.reply({
            content: 'No estás en la cola de espera!',
            ephemeral: true,
        });
        return;
    }
    client.logger.info(interaction.user.tag, 'ya no necesita ayuda');
    client.queryQueue.splice(client.queryQueue.indexOf(member), 1);
    client.sendQueryQueueEmbed();
};

export const data = new MessageButton()
    .setCustomId('out')
    .setLabel('Cancelar Consulta')
    .setStyle('DANGER');
