import {
    AnyChannel,
    Collection,
    GuildMember,
    TextChannel,
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
        oldChannel != undefined &&
        oldChannel.parentId === client.config.mitosisCategoryID &&
        oldChannel.id != client.config.mitosisVoiceChannelID &&
        oldChannel.members.size === 0
    ) {
        const group = member.roles.cache.find((role) =>
            role.name.startsWith('Grupo')
        );
        if (group != undefined && client.queryQueue.hasSomeMemberOf(group)) {
            const queryLogTextChannel = oldChannel.guild!.channels.cache.find(
                (channel) => channel.id === client.config.queryLogTextChannelID
            ) as TextChannel;
            await queryLogTextChannel!.send(
                `:no_entry: ${
                    group ? 'El ' + group.name : member.displayName
                } desestimó la consulta.`
            );
            client.queryQueue.deleteMember(member);
        }
        await oldChannel.delete();
    }
    if (
        newChannel != undefined &&
        newChannel!.id === client.config.mitosisVoiceChannelID
    ) {
        const group = member.roles.cache.find((role) =>
            role.name.startsWith('Grupo')
        );
        let voiceGroupChannel: Collection<string, AnyChannel> = new Collection();
        let channelName = `${member.displayName}`;
        if (group != undefined) {
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
