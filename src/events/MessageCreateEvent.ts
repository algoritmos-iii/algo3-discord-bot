import { Message } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Event';
import { client } from '../index';
const wait = require('util').promisify(setTimeout);

async function deleteMessageAndReply(message: Message, response: string) {
    await message.delete();
    const reply = await message.channel.send({ content: response });
    await wait(5000);
    await reply.delete();
}

export const execute: ExecuteFunction = async (message: Message) => {
    if (
        client.config.onlyThreadsTextChannelsIDs.includes(message.channelId) &&
        message.type !== 'THREAD_CREATED' &&
        message.member!.id !== client.config.clientID
    ) {
        deleteMessageAndReply(
            message,
            'Este canal es sólo para hilos! Antes de crear uno, revisá que el tema no se esté tratando en otro hilo'
        );
    } else if (
        message.author.id !== client.config.clientID &&
        (message.channelId === client.config.studentsQueryChannelID ||
            message.channelId === client.config.teachersQueryChannelID)
    ) {
        deleteMessageAndReply(message, 'No se puede escribir en este canal!');
    } else if (
        message.channelId === client.config.readmeTextChannelID &&
        message.member!.id !== client.config.clientID
    ) {
        deleteMessageAndReply(message, 'No se puede escribir en este canal!');
    }
};

export const name: string = 'messageCreate';
