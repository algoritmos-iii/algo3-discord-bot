// import consola from 'consola';
import config from '../../config.json';
import {
    Channel,
    Collection,
    GuildMember,
    VoiceChannel,
    VoiceState,
} from 'discord.js';
import { ExecuteFunction } from '../interfaces/Event';
import { client } from '../index';

export const execute: ExecuteFunction = async (
    oldState: VoiceState,
    newState: VoiceState
) => {
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;
    const member: GuildMember = newState.member!;

    if (
        oldChannel &&
        oldChannel.parentId === config.mitosisCategoryID &&
        oldChannel.id != config.mitosisVoiceChannelID &&
        oldChannel.members.size === 0
    ) {
        await oldChannel.delete();
    } else if (newChannel && newChannel!.id === config.mitosisVoiceChannelID) {
        const group = member.roles.cache.find((role) =>
            role.name.startsWith('Grupo')
        );
        let voiceGroupChannel: Collection<string, Channel> = new Collection();
        let channelName = `${member.displayName}`;
        if (group) {
            channelName = `${group.name}`;
            voiceGroupChannel = client.channels.cache.filter(
                (channel) => channel.isVoice() && channel.name === group.name
            );
        }
        if (voiceGroupChannel.size > 0) {
            await member.voice.setChannel(
                voiceGroupChannel.first() as VoiceChannel
            );
        } else {
            const createdChannel = await newChannel.guild!.channels.create(
                `${channelName}`,
                {
                    type: 'GUILD_VOICE',
                    parent: newChannel.parent!,
                }
            );
            member.voice.setChannel(createdChannel);
        }
    }
};

export const name: string = 'voiceStateUpdate';
