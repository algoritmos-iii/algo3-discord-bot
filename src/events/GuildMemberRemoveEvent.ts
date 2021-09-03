import { GuildMember } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Event';

export const execute: ExecuteFunction = async (oldMember: GuildMember) => {
    console.log(`${oldMember.user!.username} has left ${oldMember.guild.name}`);
};

export const name: string = 'guildMemberRemove';
