import consola from 'consola';
import {
    EmbedFieldData,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    TextChannel,
} from 'discord.js';
import { AlgoBot } from '../client/Client';
import { ExecuteFunction } from '../interfaces/Event';

export const execute: ExecuteFunction = async (client: AlgoBot) => {
    client.logger.success(`Ready! Logged in as ${client.user!.tag}`);
    client.removeUnusedClonedChannels();

    // TODO: Refactor the code below
    const teachersQueryChannel: TextChannel = client.channels.cache.get(
        client.config.teachersQueryChannelID
    ) as TextChannel;

    const studentsQueryChannel: TextChannel = client.channels.cache.get(
        client.config.studentsQueryChannelID
    ) as TextChannel;

    teachersQueryChannel.bulkDelete(5).catch(consola.error);
    studentsQueryChannel.bulkDelete(5).catch(consola.error);

    const queryQueueData: EmbedFieldData[] = [];
    for (let i = 0; i < client.queryQueue.length; i++) {
        queryQueueData.push({
            name: `${i}`,
            value: `Usuario ${i}`,
        });
    }

    const teachersQueryEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Cola de espera de consultas')
        .setDescription('')
        .addFields(queryQueueData);

    const nextButton = new MessageButton()
        .setCustomId('pop')
        .setLabel('Responder Consulta')
        .setStyle('DANGER');

    const teachersQueryActionRow = new MessageActionRow().addComponents(
        nextButton
    );

    const studentsQueryEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Cola de espera de consultas')
        .setDescription('')
        .addFields(queryQueueData);

    const pushButton = new MessageButton()
        .setCustomId('push')
        .setLabel('Pedir Consulta')
        .setStyle('DANGER');

    const studentsQueryActionRow = new MessageActionRow().addComponents(
        pushButton
    );

    teachersQueryChannel.send({
        embeds: [teachersQueryEmbed],
        components: [teachersQueryActionRow],
    });
    studentsQueryChannel.send({
        embeds: [studentsQueryEmbed],
        components: [studentsQueryActionRow],
    });
};

export const name: string = 'ready';

export const once: boolean = true;
