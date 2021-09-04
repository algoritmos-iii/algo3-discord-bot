import consola, { Consola } from 'consola';
import {
    Client,
    Intents,
    Collection,
    GuildMember,
    Channel,
    VoiceChannel,
} from 'discord.js';
import { Config } from '../interfaces/Config';
import { Command } from '../interfaces/Command';
import path from 'path';
import fs from 'fs';

class Bot extends Client {
    public logger: Consola = consola;
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public config!: Config;
    public queryQueue: GuildMember[] = [];

    public constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_VOICE_STATES,
            ],
        });
    }

    public async start(config: Config): Promise<void> {
        this.config = config;
        await this.loadCommands();
        await this.loadEvents();
        super.login(config.token);
    }

    private async loadCommands() {
        const commandFiles: string[] = fs
            .readdirSync(path.resolve(__dirname, '../commands'))
            .filter((file) => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
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

    public async removeUnusedClonedChannels() {
        const unusedClonedChannels = await this.filterUnusedClonedChannels();

        this.logger.info(`Removing ${unusedClonedChannels.size} unused channels...`);

        unusedClonedChannels.forEach(async (channel) => {
            await channel.delete().catch((err) => this.logger.error(err));
        });

        this.logger.success(`Unused channels removed.`);
    }

    private async filterUnusedClonedChannels(): Promise<Collection<string, Channel>> {
        this.logger.info(`Filtering unused channels...`);
        
        // TODO: Refactor filter
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
}

export { Bot as AlgoBot };
