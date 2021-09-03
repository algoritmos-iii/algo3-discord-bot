import consola, { Consola } from 'consola';
import { Client, Intents, Collection, GuildMember } from 'discord.js';
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
}

export { Bot as AlgoBot };
