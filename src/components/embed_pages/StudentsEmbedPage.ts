import { EmbedPage } from '../models/EmbedPage';
import { client } from '../../index';

export const data = new EmbedPage(
    client,
    true,
    true,
    'students',
    'Cola de espera de consultas',
    'Si tenes una duda y te gustaría que un profesor visite el canal el canal de voz de tu grupo, presioná el botón de `Pedir Ayuda`. Si ya no necesitás la consulta, retirate de la fila con el botón de `Cancelar Consulta`, así le das tu lugar al siguiente en espera.',
    [client.config.studentsQueryChannelID],
    client.queryQueue.toEmbedFieldData(),
    ['queue', 'out']
);
