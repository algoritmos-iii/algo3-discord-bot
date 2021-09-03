// import consola from 'consola';
import config from '../../config.json';
import { GuildMember, VoiceState } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Event';

export const execute: ExecuteFunction = async (
    oldState: VoiceState,
    newState: VoiceState
) => {
    const member: GuildMember = newState.member!;
    if (oldState.channelId) {
        if (
            oldState.channel!.parentId === config.mitosisCategoryID &&
            oldState.channelId != config.mitosisVoiceChannelID &&
            oldState.channel!.members.size === 0
        ) {
            await oldState.channel!.delete();
        }
    }

    if (newState.channelId === config.mitosisVoiceChannelID) {
        const newChannel = await newState.channel!.guild!.channels.create(
            'Upa, no pudiste',
            {
                type: 'GUILD_VOICE',
                parent: newState.channel!.parent!,
            }
        );
        member.voice.setChannel(newChannel);
    }
};

export const name: string = 'voiceStateUpdate';
