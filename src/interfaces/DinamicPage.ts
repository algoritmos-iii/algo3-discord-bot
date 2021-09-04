import { MessageActionRow, MessageEmbed, TextChannel } from 'discord.js';

export const queryQueuePage = async (
    residences: TextChannel[],
    embeds: MessageEmbed[],
    components: MessageActionRow[]
) => {
    residences.forEach(async (residence) => {
        await residence.bulkDelete(10);
        await residence.send({
            embeds: embeds,
            components: components,
        });
    });
};
