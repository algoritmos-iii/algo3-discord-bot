import { EmbedPage } from '../models/EmbedPage';
import { client } from '../../index';

export const data = new EmbedPage(
    client,
    true,
    true,
    'validation',
    'Cola de espera de consultas',
    'Usá el comando `/verificar` e ingresá los datos para validar tu identidad',
    [client.config.validationTextChannelID]
);
