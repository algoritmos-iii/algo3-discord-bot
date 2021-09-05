import { Message } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Event';
import { client } from '../index';
const wait = require('util').promisify(setTimeout);

export const execute: ExecuteFunction = async (message: Message) => {
    if (
        client.config.onlyThreadsTextChannelsIDs.includes(message.channelId) &&
        message.type !== 'THREAD_CREATED' &&
        message.member!.id !== client.config.clientID
    ) {
        await message.delete();
        const reply = await message.channel.send({
            content:
                'Este canal es sólo para hilos! Antes de crear uno, revisá que el tema no se esté tratando en otro hilo',
        });
        await wait(5000);
        await reply.delete();
    }
};

export const name: string = 'messageCreate';
