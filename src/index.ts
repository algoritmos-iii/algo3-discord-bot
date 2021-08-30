import { Config } from './interfaces/Config';
import * as File from '../config.json';
import { AlgoBot } from './client/Client';

const client: AlgoBot = new AlgoBot();

client.start(File as Config);

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

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
});
