import { Interaction } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Event';

export const execute: ExecuteFunction = async (interaction: Interaction) => {
    console.log(
        `${
            interaction.user.tag
        } in #${interaction.channel!} triggered an interaction.`
    );
};

export const name: string = 'ready';
