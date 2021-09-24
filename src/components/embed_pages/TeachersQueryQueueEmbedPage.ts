import { EmbedPage } from '../models/EmbedPage';
import { client } from '../../index';

export const data = new EmbedPage(
    client,
    'teachers',
    'Cola de espera de consultas',
    'Si querés atender la próxima consulta, presioná el botón `Atender Próximo Grupo`, si ves que la cola de espera quedó con consultas, podés limpiarla con el botón `Limpiar',
    [client.config.teachersQueryChannelID],
    client.queryQueue.toEmbedFieldData(),
    ['dequeue']
);
