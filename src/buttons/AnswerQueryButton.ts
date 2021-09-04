import { MessageButton, ButtonInteraction, GuildMember } from 'discord.js';
import { client } from '../index';

export const execute = async (interaction: ButtonInteraction) => {
    if (client.queryQueue.length === 0) {
        await interaction.reply({
            content: 'Nadie necesita ayuda por el momento!',
            ephemeral: true,
        });
        return;
    }
    const consultee: GuildMember | undefined = client.queryQueue.shift();
    client.logger.info(
        interaction.user.tag,
        `va a responder a ${consultee?.user.tag}`
    );
    client.updateQueryQueueEmbed();
};

export const data = new MessageButton()
    .setCustomId('dequeue')
    .setLabel('Atender Próximo Grupo')
    .setStyle('PRIMARY');
