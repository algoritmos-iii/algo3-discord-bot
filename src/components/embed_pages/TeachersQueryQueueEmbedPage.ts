import { EmbedPage } from '../models/EmbedPage';
import { client } from '../../index';

export const data = new EmbedPage(
    client,
    true,
    'teachers',
    'Cola de espera de consultas',
    'Para consultas por vos',
    [client.config.teachersQueryChannelID],
    client.queryQueue.toEmbedFieldData(),
    ['dequeue']
);
