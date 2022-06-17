import { EmbedPage } from '../models/EmbedPage';
import { client } from '../../index';

const alan_kay_quotes: string[] = [
    "Most people have managed to get by without being educated... because, in order to make education more user-friendly, they managed to forget about the changes in people's brains that are supposed to happen.",
    "Television is the last technology we should be allowed to invent and put out without a surgeon general's warning.",
    "In natural science, Nature has given us a world and we're just to discover its laws. In computers, we can stuff laws into it and create a world.",
    'The future is not laid out on a track. It is something that we can decide, and to the extent that we do not violate any known laws of the universe, we can probably make it work the way that we want to.',
    'The Internet was done so well that most people think of it as a natural resource like the Pacific Ocean, rather than something that was man-made. When was the last time a technology with a scale like that was so error-free? The Web, in comparison, is a joke. The Web was done by amateurs.',
    'People who are really serious about software should make their own hardware.',
    'Some people worry that artificial intelligence will make us feel inferior, but then, anybody in his right mind should have an inferiority complex every time he looks at a flower.',
    "Normal is the greatest enemy with regard to creating the new. And the way of getting around this is you have to understand normal not as reality, but just a construct. And a way to do that, for example, is just travel to a lot of different countries and you'll find a thousand different ways of thinking the world is real, all of which are just stories inside of people's heads. That's what we are too. Normal is just a construct, and to the extent that you can see normal as a construct in yourself, you have freed yourself from the constraints of thinking this is the way the world is. Because it isn't. This is the way we are.",
    "Scratch the surface in a typical boardroom and we're all just cavemen with briefcases, hungry for a wise person to tell us stories.",
    "Don't worry about what anybody else is going to do. The best way to predict the future is to invent it.",
    'Simple things should be simple, complex things should be possible.',
    "I don't know how many of you have ever met Dijkstra, but you probably know that arrogance in computer science is measured in nano-Dijkstras.",
    'Technology is anything invented after you were born.',
    'The most disastrous thing that you can ever learn is your first programming language.',
];
const get_random_phrase = (phrases: string[]) =>
    phrases[Math.floor(Math.random() * phrases.length)];

export const data = new EmbedPage(
    client,
    false,
    false,
    false,
    'holiday',
    'Hoy no hay clase',
    '',
    [client.config.generalTextChannelID],
    [
        {
            name: 'Frase insipradora del dia',
            value: get_random_phrase(alan_kay_quotes),
        },
    ],
    null,
    null,
    client.guilds.cache
        .first()!
        .roles.cache.get(client.config.studentRoleID)
        ?.toString()
);
