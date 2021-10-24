import { Message, MessageEmbed } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Event';
import { client } from '../index';

export const execute: ExecuteFunction = async (message: Message) => {
    if (message.webhookId === client.config.githubWebhookID) {
        const webhook = await message.fetchWebhook();
        const webhookMessageEmbed = (await webhook.fetchMessage(message.id))
            .embeds as MessageEmbed[];
        webhook.editMessage(message, {
            content:
                '**Ya está disponible el enunciado del ejercicio de esta semana!**',
            embeds: webhookMessageEmbed,
        });
    }
};

export const name: string = 'messageCreate';
