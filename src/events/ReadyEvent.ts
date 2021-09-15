import { AlgoBot } from '../client/Client';
import { ExecuteFunction } from '../interfaces/Event';

export const execute: ExecuteFunction = async (client: AlgoBot) => {
    await client.removeUnusedClonedChannels();
    await client.loadEmbeds();
    client.scheduleMessages();
    client.logger.success(`Ready! Loaded & Logged in as ${client.user!.tag}`);
};

export const name: string = 'ready';

export const once: boolean = true;
