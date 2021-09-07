import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, GuildMember } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Command';
import * as students from '../../assets/students.json';
import * as config from '../../config.json';

function emailIsValid(email: string) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function padronIsValid(padron: string) {
    return padron.length >= 5 && padron.length <= 6 && !isNaN(parseInt(padron));
}

function validate(email: string, padron: string) {
    let match = false;
    for (const index in students) {
        match =
            students[index].email == email && students[index].padron == padron;
        if (match) {
            return true;
        }
    }
    return false;
}

export const execute: ExecuteFunction = async (
    interaction: CommandInteraction
): Promise<void> => {
    const email = interaction.options.data[0].value as string;
    const padron = interaction.options.data[1].value as string;
    const member = interaction.member as GuildMember;

    await interaction.deferReply({ ephemeral: true });

    if (
        !emailIsValid(email) ||
        !padronIsValid(padron) ||
        !validate(email, padron)
    ) {
        await interaction.editReply(
            'Datos ingresados inválidos (revisá que estén bien escritos y recordá que tenés que utilizar los mismos usaste para llenar el forms). *Si llevás varios intentos, consultá con un docente...*'
        );
        return;
    }

    await interaction.editReply('Validación exitosa!');
    const studentRole = member.guild.roles.cache.find(
        (role) => role.id === config.studentRoleID
    )!;
    if (member.roles.cache.has(studentRole.id)) {
        return;
    }
    await member.roles.add(studentRole);

    const validatedRole = member.guild.roles.cache.find(
        (role) => role.id === config.validatedRoleID
    )!;
    await member.roles.remove(validatedRole);
};

export const data = new SlashCommandBuilder()
    .setName('verificar')
    .setDescription('Verifica que efectivamente sea alumno de la cátedra')
    .addStringOption((option) =>
        option.setName('email').setDescription('email').setRequired(true)
    )
    .addStringOption((option) =>
        option.setName('padrón').setDescription('padron').setRequired(true)
    );
