import { GuildMember } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Event';
import { client } from '../index';

export const execute: ExecuteFunction = async (newMember: GuildMember) => {
    client.logger.log(
        `${newMember.user.username} has joined ${newMember.guild.name}`
    );
};

export const name: string = 'guildMemberAdd';
