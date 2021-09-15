import { EmbedPage } from '../models/EmbedPage';
import { client } from '../../index';
import * as event from '../../../assets/nextEvent.json';

export const data = new EmbedPage(
    client,
    false,
    'nextClass',
    'Información de la próxima clase',
    '',
    [client.config.readmeTextChannelID],
    [
        {
            name: 'Link a la reunión de zoom',
            value: 'https://us02web.zoom.us/j/85830005780?pwd=cXFXUnA5RG1JZUdWTUxsT1J4Tjdrdz09',
        },
        {
            name: 'Recordatorio',
            value: 'Usar tu nombre real, que lo podes cambiar haciendo click derecho en tu cuadrito y click en cambiar nombre.\nPrendé tu cámara :D',
        },
        {
            name: 'Detalles de la clase',
            value: `Empieza el ${dateFromISO(
                event.start.dateTime
            )} y termina el ${dateFromISO(event.start.dateTime)}`,
        },
        {
            name: 'Temas',
            value: `${event.summary}`,
        },
        {
            name: 'Lecturas, entregas',
            value: `${
                event.description.replace(event.summary, '').length === 1
                    ? '-'
                    : event.description
                          .replace(event.summary, '')
                          .concat(
                              `\n*Para encontrar el link a un paper podés hacerlo desde ${client.channels.cache.get(
                                  client.config.papersTextChannelID
                              )} o en la [web de la cátedra](https://algoritmos-iii.github.io/)*`
                          )
            }`,
        },
    ],
    null,
    null,
    `${client.guilds.cache
        .first()
        ?.roles.cache.get(client.config.studentRoleID)}`
);

function dateFromISO(isoDate: string) {
    const date = new Date(isoDate);
    return date.toLocaleTimeString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    });
}
