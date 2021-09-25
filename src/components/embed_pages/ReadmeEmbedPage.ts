import { EmbedPage } from '../models/EmbedPage';
import { client } from '../../index';

export const data = new EmbedPage(
    client,
    true,
    true,
    'readme',
    'Algoritmos y Programación III - Cátedra Leveroni',
    'Para consultas por vos',
    [client.config.readmeTextChannelID],
    [
        {
            name: 'Buenas! Bienvenides al servidor de discord',
            value: 'En este servidor van a poder encontrar info sobre la cursada y hacer consultas diréctamente a los docentes, cualquier cosa que necesiten no duden en preguntar!',
        },
        {
            name: '\u200B',
            value: 'Por favor les pedimos que pongan su nombre y apellido reales para saber quienes son y poder buscarlos en la lista. Para cambiar el nombre que aparece en este servidor simplemente deben hacer click derecho en su nombre en la lista de personas conectadas y hacer click en "Change Nickname"/"Cambiar Apodo". Este cambio solo afectara el nombre mostrado en este servidor por lo que si están afiliados a otros servidores de Discord no se cambiara su nombre de usuario en los mismos. Alternativamente en escritorio o para los que esten desde celular (Android, ni idea si es igual en iOS), pueden hacer click en las opciones del servidor (Arriba a la izquierda, la flechita para abajo o los tres puntos) y ahi tambien pueden tocar Cambiar Apodo/Change Nickname',
        },
        { name: '\u200B', value: '\u200B' },
        {
            name: 'Página de la materia',
            value: 'https://algoritmos-iii.github.io/',
            inline: true,
        },
        {
            name: 'Lista de mails',
            value: 'fiuba-algoritmos-iii@googlegroups.com',
            inline: true,
        },
        {
            name: 'Lista de mails docentes',
            value: 'fiuba-algoritmos-iii-doc@googlegroups.com',
            inline: true,
        },
    ],
    ['readme'],
    'https://algoritmos-iii.github.io/'
);

// TODO: add a link to the class
