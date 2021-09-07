import { AlgoBot } from '../client/Client';
import { ExecuteFunction } from '../interfaces/Event';

export const execute: ExecuteFunction = async (client: AlgoBot) => {
    client.logger.success(`Ready! Logged in as ${client.user!.tag}`);
    client.removeUnusedClonedChannels();
    client.sendStudentsQueryQueueEmbed();
    client.sendTeachersQueryQueueEmbed();
    client.sendReadmeEmbedMessage();
    // client.sendValidationHelpEmbedMessage();
    client.sendPapersEmbedMessage();
};

export const name: string = 'ready';

export const once: boolean = true;
