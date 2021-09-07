import consola, { Consola } from 'consola';
import {
    Client,
    Intents,
    Collection,
    Channel,
    VoiceChannel,
    MessageEmbed,
    EmbedFieldData,
    TextChannel,
    MessageActionRow,
} from 'discord.js';
import { Config } from '../interfaces/Config';
import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';
import { Button } from '../interfaces/Button';
import path from 'path';
import fs from 'fs';
import { QueryQueue } from '../components/QueryQueue';
import * as papers from '../../assets/bibliography_links.json';

class Bot extends Client {
    public logger: Consola = consola;
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public buttons: Collection<string, Button> = new Collection();
    public config!: Config;
    public queryQueueEmbed!: MessageEmbed;
    public readmeEmbed!: MessageEmbed;
    public queryQueue: QueryQueue = new QueryQueue();

    public constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.GUILD_WEBHOOKS,
            ],
        });
    }

    public async start(config: Config): Promise<void> {
        this.config = config;
        await this.loadCommands();
        await this.loadEvents();
        await this.loadButtons();
        super.login(config.token);
    }

    private async loadCommands() {
        const commandFiles: string[] = fs
            .readdirSync(path.resolve(__dirname, '../commands'))
            .filter((file) => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command: Command = require(`../commands/${file}`);
            this.commands.set(command.data.name, command);
        }
    }

    private async loadEvents() {
        const eventFiles = fs
            .readdirSync(path.resolve(__dirname, '../events'))
            .filter((file) => file.endsWith('.js'));

        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
            if (event.once) {
                this.once(event.name, (...args) => event.execute(...args));
            } else {
                this.on(event.name, (...args) => event.execute(...args));
            }
        }
    }

    private async loadButtons() {
        const buttonFiles: string[] = fs
            .readdirSync(path.resolve(__dirname, '../buttons'))
            .filter((file) => file.endsWith('.js'));

        for (const file of buttonFiles) {
            const button: Button = require(`../buttons/${file}`);
            this.buttons.set(button.data.customId!, button);
        }
    }

    public async removeUnusedClonedChannels() {
        const unusedClonedChannels = await this.filterUnusedClonedChannels();

        this.logger.info(
            `Removing ${unusedClonedChannels.size} unused channels...`
        );

        unusedClonedChannels.forEach(async (channel) => {
            await channel.delete().catch((err) => this.logger.error(err));
        });

        this.logger.success(`Unused channels removed.`);
    }

    private async filterUnusedClonedChannels(): Promise<
        Collection<string, Channel>
    > {
        this.logger.info(`Filtering unused channels...`);

        const unusedClonedChannels = this.channels.cache.filter(
            (channel) =>
                channel.isVoice() &&
                (channel as VoiceChannel).members.size === 0 &&
                this.isMitosisCategory(channel) &&
                this.isNotDonor(channel)
        );

        this.logger.success(`Unused channels filtered.`);

        return unusedClonedChannels;
    }

    private isNotDonor(channel: Channel): boolean {
        return channel.id !== this.config.mitosisVoiceChannelID;
    }

    private isMitosisCategory(channel: Channel) {
        return (
            (channel as VoiceChannel).parent!.id ==
            this.config.mitosisCategoryID
        );
    }

    public async sendStudentsQueryQueueEmbed() {
        const studentsQueryChannel: TextChannel = this.channels.cache.get(
            this.config.studentsQueryChannelID
        ) as TextChannel;

        const queryQueueData: EmbedFieldData[] =
            this.queryQueue.toEmbedFieldData();

        this.queryQueueEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Cola de espera de consultas')
            .setDescription('')
            .addFields(queryQueueData);

        const previousMessages = await studentsQueryChannel.messages.fetch();

        if (previousMessages.size != 0) {
            await previousMessages.first()!.edit({
                embeds: [this.queryQueueEmbed],
                components: [
                    new MessageActionRow().addComponents(
                        this.buttons.get('queue')!.data,
                        this.buttons.get('out')!.data
                    ),
                ],
            });
        } else {
            await studentsQueryChannel.send({
                embeds: [this.queryQueueEmbed],
                components: [
                    new MessageActionRow().addComponents(
                        this.buttons.get('queue')!.data,
                        this.buttons.get('out')!.data
                    ),
                ],
            });
        }
    }

    public async sendTeachersQueryQueueEmbed() {
        const teachersQueryChannel: TextChannel = this.channels.cache.get(
            this.config.teachersQueryChannelID
        ) as TextChannel;

        const queryQueueData: EmbedFieldData[] =
            this.queryQueue.toEmbedFieldData();

        this.queryQueueEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Cola de espera de consultas')
            .setDescription('')
            .addFields(queryQueueData);

        const previousMessages = await teachersQueryChannel.messages.fetch();

        if (previousMessages.size != 0) {
            await previousMessages.first()!.edit({
                embeds: [this.queryQueueEmbed],
                components: [
                    new MessageActionRow().addComponents(
                        this.buttons.get('dequeue')!.data
                    ),
                ],
            });
        } else {
            await teachersQueryChannel.send({
                embeds: [this.queryQueueEmbed],
                components: [
                    new MessageActionRow().addComponents(
                        this.buttons.get('dequeue')!.data
                    ),
                ],
            });
        }
    }

    public async sendReadmeEmbedMessage() {
        const readmeChannel = this.channels.cache.get(
            this.config.readmeTextChannelID
        ) as TextChannel;

        this.readmeEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Algoritmos y Programación III - Cátedra Leveroni')
            .setURL('https://algoritmos-iii.github.io/')
            .addFields(
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
                }
            );

        const previousMessages = await readmeChannel.messages.fetch();

        if (previousMessages.size != 0) {
            await previousMessages.first()!.edit({
                embeds: [this.readmeEmbed],
                components: [
                    new MessageActionRow().addComponents(
                        this.buttons.get('readme')!.data
                    ),
                ],
            });
        } else {
            await readmeChannel.send({
                embeds: [this.readmeEmbed],
                components: [
                    new MessageActionRow().addComponents(
                        this.buttons.get('readme')!.data
                    ),
                ],
            });
        }
    }

    public async sendValidationHelpEmbedMessage() {
        const validationChannel = this.channels.cache.get(
            this.config.validationTextChannelID
        ) as TextChannel;

        const validationHelpEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Validación!')
            .setDescription(
                'Usá el comando `/verificar` e ingresá los datos para validar tu identidad'
            );

        const previousMessages = await validationChannel.messages.fetch();

        if (previousMessages.size != 0) {
            await previousMessages.first()!.edit({
                embeds: [validationHelpEmbed],
            });
        } else {
            await validationChannel.send({
                embeds: [validationHelpEmbed],
            });
        }
    }

    public async sendPapersEmbedMessage() {
        const papersChannel = this.channels.cache.get(
            this.config.papersTextChannelID
        ) as TextChannel;

        const papersEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Lista de lecturas')
            .addFields(this.paperLinksFields());

        const previousMessages = await papersChannel.messages.fetch();

        if (previousMessages.size != 0) {
            await previousMessages.first()!.edit({
                embeds: [papersEmbed],
            });
        } else {
            await papersChannel.send({
                embeds: [papersEmbed],
            });
        }
    }

    private paperLinksFields(): EmbedFieldData[] {
        const papersFields: EmbedFieldData[] = [];

        for (const i in papers) {
            const paper = papers[i];
            if (i != 'default') {
                papersFields.push({
                    name: '\u200B',
                    value: `[${paper.name}](${paper.url})`,
                });
            }
        }

        return papersFields;
    }
}

export { Bot as AlgoBot };
