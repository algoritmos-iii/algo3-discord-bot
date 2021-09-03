import { Config } from './interfaces/Config';
import * as File from '../config.json';
import { AlgoBot } from './client/Client';
import {
    EmbedFieldData,
    GuildMember,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    TextChannel,
} from 'discord.js';
import consola from 'consola';

const client: AlgoBot = new AlgoBot();

client.start(File as Config);

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            client.logger.error(error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        }
    }
    if (interaction.isButton()) {
        const buttonID = (interaction.component! as MessageButton).customId;
        const member = interaction.member! as GuildMember;
        if (buttonID === 'pop') {
            if (client.queryQueue.length === 0) {
                await interaction.reply({
                    content: 'Nadie necesita ayuda por el momento!',
                    ephemeral: true,
                });
                return;
            }
            const consultee: GuildMember | undefined = client.queryQueue.pop();
            client.logger.info(
                interaction.user.tag,
                `va a responder a ${consultee?.user.tag}`
            );
            drawEmbeds();
        } else if (buttonID === 'push') {
            if (client.queryQueue.indexOf(member) != -1) {
                await interaction.reply({
                    content: 'Ya estás en la cola de espera!',
                    ephemeral: true,
                });
                return;
            }
            client.logger.info(interaction.user.tag, 'quiere ayuda');
            client.queryQueue.push(interaction.member as GuildMember);
            drawEmbeds();
        }
    }
    return;
});

// TODO: Refactor the code below
function drawEmbeds() {
    const teachersQueryChannel: TextChannel = client.channels.cache.get(
        client.config.teachersQueryChannelID
    ) as TextChannel;

    const studentsQueryChannel: TextChannel = client.channels.cache.get(
        client.config.studentsQueryChannelID
    ) as TextChannel;

    teachersQueryChannel.bulkDelete(5).catch(consola.error);
    studentsQueryChannel.bulkDelete(5).catch(consola.error);

    const queryQueueData: EmbedFieldData[] = [];
    for (let i = 0; i < client.queryQueue.length; i++) {
        queryQueueData.push({
            name: `${i}. ${client.queryQueue[i].user.username}`,
            value: `Grupo ${i}`,
        });
    }

    const teachersQueryEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Cola de espera de consultas')
        .setDescription('')
        .addFields(queryQueueData);

    const nextButton = new MessageButton()
        .setCustomId('pop')
        .setLabel('Responder Consulta')
        .setStyle('DANGER');

    const teachersQueryActionRow = new MessageActionRow().addComponents(
        nextButton
    );

    const studentsQueryEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Cola de espera de consultas')
        .setDescription('')
        .addFields(queryQueueData);

    const pushButton = new MessageButton()
        .setCustomId('push')
        .setLabel('Pedir Consulta')
        .setStyle('DANGER');

    const studentsQueryActionRow = new MessageActionRow().addComponents(
        pushButton
    );

    teachersQueryChannel.send({
        embeds: [teachersQueryEmbed],
        components: [teachersQueryActionRow],
    });
    studentsQueryChannel.send({
        embeds: [studentsQueryEmbed],
        components: [studentsQueryActionRow],
    });
}
