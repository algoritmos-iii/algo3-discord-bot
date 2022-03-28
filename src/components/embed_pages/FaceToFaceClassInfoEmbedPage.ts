import { EmbedPage } from '../models/EmbedPage';
import { client } from '../../index';
import event from '../../../assets/event.json';
import { AlgoBot } from '../../client/Client';

export const data = new EmbedPage(
    client,
    false,
    false,
    false,
    'nextFaceToFaceClass',
    'Información de la próxima clase presencial',
    '',
    [client.config.generalTextChannelID],
    [
        {
            name: 'Aula',
            value: '305',
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
            value: extractTopicsFromEventDescription(event.description),
        },
        {
            name: 'Ejercicio a tener entregado',
            value: extractExercisesFromEventDescription(event.description),
        },
        {
            name: 'Paper a tener leído',
            value:
                extractLecturesFromEventDescription(event.description) +
                '\n*Para encontrar el link a un paper podés hacerlo desde ' +
                client.channels.cache.get(client.config.papersTextChannelID) +
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
