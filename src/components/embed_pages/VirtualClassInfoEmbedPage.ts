import { EmbedPage } from '../models/EmbedPage';
import { client } from '../../index';
import * as event from '../../../assets/event.json';
import { AlgoBot } from '../../client/Client';

export const data = new EmbedPage(
    client,
    false,
    false,
    false,
    'nextVirtualClass',
    'Información de la próxima clase virtual',
    '',
    [client.config.generalTextChannelID],
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
            value: `Empieza el ${AlgoBot.dateFromISO(
                event.start.dateTime,
                event.start.timeZone
            )} y termina el ${AlgoBot.dateFromISO(
                event.end.dateTime,
                event.end.timeZone
            )}`,
        },
        {
            name: 'Temas a ver',
            value: event.summary.toLowerCase().includes('holiday')
                ? 'NO HAY CLASES'
                : extractTopicsFromEventDescription(event.description),
        },
        {
            name: 'Ejercicio a tener entregado',
            value: event.summary.toLowerCase().includes('holiday')
                ? 'NO HAY CLASES'
                : extractExercisesFromEventDescription(event.description),
        },
        {
            name: 'Paper a tener leído',
            value: event.summary.toLowerCase().includes('holiday')
                ? 'NO HAY CLASES'
                : extractLecturesFromEventDescription(event.description) +
                  '\n*Para encontrar el link a un paper podés hacerlo desde ' +
                  client.channels.cache
                      .get(client.config.papersTextChannelID)
                      ?.toString() +
                  ' o en la [web de la cátedra](https://algoritmos-iii.github.io/)*',
        },
    ],
    null,
    null,
    client.guilds.cache
        .first()!
        .roles.cache.get(client.config.studentRoleID)
        ?.toString()
);

function extractTopicsFromEventDescription(eventDescription: string): string {
    let classTopics = eventDescription.split('Temas a tratar: ')[1];
    classTopics = classTopics.split('Paper a tener leído: ')[0];
    classTopics = classTopics.split('Ejercicio a tener entregado: ')[0];
    return classTopics;
}

function extractLecturesFromEventDescription(eventDescription: string): string {
    if (eventDescription.includes('Paper a tener leído: ')) {
        let classLectures = eventDescription.split('Paper a tener leído: ')[1];
        classLectures = classLectures.split('Ejercicio a tener entregado: ')[0];
        return classLectures;
    } else {
        return '-';
    }
}

function extractExercisesFromEventDescription(
    eventDescription: string
): string {
    if (eventDescription.includes('Ejercicio a tener entregado: ')) {
        let classExercises = eventDescription.split(
            'Ejercicio a tener entregado: '
        )[1];
        return classExercises;
    } else {
        return '-';
    }
}
