import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, GuildMember } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Command';
import * as students from '../../assets/Listado.json';

function emailIsValid(email: string) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function padronIsValid(padron: string) {
    const minimumPadronLength = 5;
    const maximumPadronLength = 6;
    return (
        padron.length >= minimumPadronLength &&
        padron.length <= maximumPadronLength &&
        !isNaN(parseInt(padron))
    );
}

function getStudentInfo(email: string, padron: string) {
    for (const index in students) {
        if (
            students[index].includes(email) &&
            students[index].includes(padron)
        ) {
            return students[index];
        }
    }
    return [];
}

export const execute: ExecuteFunction = async (
    interaction: CommandInteraction
): Promise<void> => {
    const email = interaction.options.data[0].value as string;
    const padron = interaction.options.data[1].value as string;
    const member = interaction.member as GuildMember;

    await interaction.deferReply({ ephemeral: true });

    const studentInfo = getStudentInfo(email, padron);

    if (
        !emailIsValid(email) ||
        !padronIsValid(padron) ||
        studentInfo.length === 0
    ) {
        await interaction.editReply(
            'Datos ingresados inválidos (revisá que estén bien escritos y recordá que tenés que utilizar los mismos usaste para llenar el forms). \n*Si llevás varios intentos, consultá con un docente...*'
        );
        return;
    }

    const groupNumber = studentInfo[3];

    if (groupNumber === "#N/A") {
        await interaction.editReply(
            'Todavía no tenes grupo. \n*Si esto es un error, y en realidad si tenes grupo, consultá con un docente...*'
        );
        return;
    }

    const memberGroupRoleName = `Grupo ${groupNumber}`;

    if (member.roles.cache.find((role) => role.name === memberGroupRoleName)) {
        await interaction.editReply(
            'Ya tenías el rol de grupo asignado!\n*Si es el equivocado, ponete en contacto con un docente para que vea tu situación.*'
        );
        return;
    }

    let groupRole = member.guild.roles.cache.find(
        (role) => role.id === memberGroupRoleName
    )!;

    if (groupRole) {
        await member.roles.add(groupRole);
    } else {
        groupRole = await member.guild.roles.create({
            name: memberGroupRoleName,
            color: 'RANDOM',
        });
        await member.roles.add(groupRole);
    }
    await interaction.editReply(
        'Validación exitosa!, ya deberías tener el rol de tu grupo. \n*Si no es el caso contrario contactate con un docente.*'
    );
};

export const data = new SlashCommandBuilder()
    .setName('pedir_rol_grupo')
    .setDescription('Verifica tus datos y te asigna el rol según corresponda')
    .addStringOption((option) =>
        option.setName('email').setDescription('email').setRequired(true)
    )
    .addStringOption((option) =>
        option.setName('padrón').setDescription('padron').setRequired(true)
    );
