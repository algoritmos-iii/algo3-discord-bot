import { AlgoBot } from '../client/Client';
import { ExecuteFunction } from '../interfaces/Event';

export const execute: ExecuteFunction = async (client: AlgoBot) => {
    client.logger.success(`Ready! Logged in as ${client.user!.tag}`);
};

export const name: string = 'ready';

export const once: boolean = true;
