import { GuildMember } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Event';
import { client } from '../index';

export const execute: ExecuteFunction = async (newMember: GuildMember) => {
    client.logger.log(
        `${newMember.user.username} has joined ${newMember.guild.name}`
    );
    await newMember.roles
        .add(
            newMember.guild.roles.cache.find(
                (role) => role.id === client.config.studentRoleID
            )!
        )
        .catch(client.logger.error);
};

export const name: string = 'guildMemberAdd';
