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

function studentIsValid(email: string, padron: string): boolean {
    return students.some((student) => {
        return student.includes(email) && student.includes(padron);
    });
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
        !studentIsValid(email, padron)
    ) {
        await interaction.editReply(
            'Datos ingresados inválidos (revisá que estén bien escritos y recordá que tenés que utilizar los mismos usaste para llenar el forms). \n*Si llevás varios intentos, consultá con un docente...*'
        );
        return;
    }

    let cuatrimestre = '1c2022';

    let studentRole = member.guild.roles.cache.find(
        (role) => role.name === cuatrimestre
    )!;

    if (member.roles.cache.find((role) => role.name === cuatrimestre)) {
        await interaction.editReply(
            'Ya tenías el rol de grupo asignado!\n*Si es el equivocado, ponete en contacto con un docente para que vea tu situación.*'
        );
        return;
    }

    await member.roles.add(studentRole);

    await interaction.editReply(
        'Validación exitosa!, ya deberías poder ver más canales. \n*Si no es el caso contrario contactate con un docente.*'
    );
};

export const data = new SlashCommandBuilder()
    .setName('pedir_rol_alumno')
    .setDescription(
        'Verifica tus datos y te asigna permisos de alumno si existis en nuestra planilla.'
    )
    .addStringOption((option) =>
        option.setName('email').setDescription('email').setRequired(true)
    )
    .addStringOption((option) =>
        option.setName('padrón').setDescription('padron').setRequired(true)
    );
