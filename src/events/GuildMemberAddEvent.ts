import consola from 'consola';
import { GuildMember } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Event';

export const execute: ExecuteFunction = async (newMember: GuildMember) => {
    console.log(
        `${newMember.user.username} has joined ${newMember.guild.name}`
    );
    await newMember.roles
        .add(
            newMember.guild.roles.cache.find(
                (role) => role.name === 'newcomer'
            )!
        )
        .catch(consola.error);
};

export const name: string = 'guildMemberAdd';
