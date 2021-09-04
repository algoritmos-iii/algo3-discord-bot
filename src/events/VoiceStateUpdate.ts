// import consola from 'consola';
import config from '../../config.json';
import { GuildMember, VoiceState } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Event';

export const execute: ExecuteFunction = async (
    oldState: VoiceState,
    newState: VoiceState
) => {
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;
    const member: GuildMember = newState.member!;

    if (oldChannel?.id) {
        if (
            oldState.channel!.parentId === config.mitosisCategoryID &&
            oldState.channelId != config.mitosisVoiceChannelID &&
            oldState.channel!.members.size === 0
        ) {
            await oldState.channel!.delete();
        }
    }

    if (newChannel!.id === config.mitosisVoiceChannelID) {
        const createdChannel = await newState.channel!.guild!.channels.create(
            'Hijo',
            {
                type: 'GUILD_VOICE',
                parent: newState.channel!.parent!,
            }
        );
        member.voice.setChannel(createdChannel);
    }
};

export const name: string = 'voiceStateUpdate';
