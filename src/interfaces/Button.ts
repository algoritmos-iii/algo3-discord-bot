import { ButtonInteraction, MessageButton } from 'discord.js';

export interface ExecuteFunction {
    (interaction: ButtonInteraction): Promise<void>;
}

export interface Button {
    data: MessageButton;
    execute: ExecuteFunction;
}
