import { MessageButton, Interaction } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Event';
import { client } from '../index';
import { Button } from '../interfaces/Button';

export const execute: ExecuteFunction = async (interaction: Interaction) => {
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
        const button: Button | undefined = client.buttons.get(
            (interaction.component! as MessageButton).customId!
        );

        if (!button) return;

        try {
            await button.execute(interaction);
        } catch (error) {
            client.logger.error(error);
            await interaction.reply({
                content: 'There was an error while executing this button!',
                ephemeral: true,
            });
        }
    }
    return;
};

export const name: string = 'interactionCreate';
