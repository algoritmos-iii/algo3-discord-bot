import { AlgoBot } from '../client/Client';
import { ExecuteFunction } from '../interfaces/Event';

export const execute: ExecuteFunction = async (client: AlgoBot) => {
    client.logger.success(`Ready! Logged in as ${client.user!.tag}`);
    client.removeUnusedClonedChannels();
    client.sendQueryQueueEmbed();
    client.sendReadmeEmbedMessage();
};

export const name: string = 'ready';

export const once: boolean = true;
