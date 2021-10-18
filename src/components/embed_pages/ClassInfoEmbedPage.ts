import { EmbedPage } from '../models/EmbedPage';
import { client } from '../../index';
import * as event from '../../../assets/event.json';

export const data = new EmbedPage(
    client,
    false,
    false,
    false,
    'nextClass',
    'Información de la próxima clase',
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
            value: `Empieza el ${dateFromISO(
                event.start.dateTime,
                event.start.timeZone
            )} y termina el ${dateFromISO(
                event.end.dateTime,
                event.end.timeZone
            )}`,
        },
        {
            name: 'Temas a ver',
            value: `${extractTopicsFromEventDescription(event.description)}`,
        },
        {
            name: 'Ejercicio a tener entregado',
            value: `${extractExercisesFromEventDescription(event.description)}`,
        },
        {
            name: 'Paper a tener leído',
            value: `${extractLecturesFromEventDescription(
                event.description
            ).concat(
                `\n*Para encontrar el link a un paper podés hacerlo desde ${client.channels.cache.get(
                    client.config.papersTextChannelID
                )} o en la [web de la cátedra](https://algoritmos-iii.github.io/)*`
            )}`,
        },
    ],
    null,
    null,
    `${client.guilds.cache
        .first()!
        .roles.cache.get(client.config.studentRoleID)}`
);

function dateFromISO(isoDate: string, timeZone: string) {
    const date = new Date(isoDate);
    return date.toLocaleTimeString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: timeZone,
    });
}

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
