import { ButtonInteraction, GuildMember, MessageButton } from 'discord.js';
import { client } from '../index';

export const execute = async (interaction: ButtonInteraction) => {
    const member = interaction.member as GuildMember;
    if (client.queryQueue.indexOf(member) != -1) {
        await interaction.reply({
            content: 'Ya estás en la cola de espera!',
            ephemeral: true,
        });
        return;
    }
    client.logger.info(interaction.user.tag, 'quiere ayuda');
    client.queryQueue.push(member);
    client.updateQueryQueueEmbed();
};

export const data = new MessageButton()
    .setCustomId('queue')
    .setLabel('Pedir Ayuda')
    .setStyle('PRIMARY');
