import { SlashCommandBuilder } from '@discordjs/builders';
// import consola from 'consola';
import { CommandInteraction } from 'discord.js';
import { ExecuteFunction } from '../interfaces/Command';

function emailIsValid(email: string) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function padronIsValid(padron: string) {
    return padron.length == 6 && !isNaN(parseInt(padron));
}

// function post(url: string, inputs: {email: string, padron: string}) {
//     const request = new XMLHttpRequest();
//     request.open("POST", url, true);
//     request.setRequestHeader('Content-Type', 'application/json');
//     request.send(JSON.stringify({
//         email: inputs.email,
//         padron: inputs.padron
//     }));
// }

// async function post(url: string) {
//     const formEl = document.querySelector("form");
//     formEl?.addEventListener("submit", async (element) => {
//         element.preventDefault();
//         const formData = new FormData(formEl);
//         const formDataSerialized = Object.fromEntries(formData);
//         const jsonObject = {
//             ...formDataSerialized,
//             sendToSelf: formDataSerialized.sendToSelf ? true : false,
//         };
//         try {
//             const response = await fetch(url, {
//                 method: "POST",
//                 body: JSON.stringify(jsonObject),
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             const json = await response.json();
//             consola.log(json);
//         } catch (error) {
//             consola.log(error);
//             alert("ERROR");
//         }
//     });
// }

export const execute: ExecuteFunction = async (
    interaction: CommandInteraction
): Promise<void> => {
    const email = interaction.options.data[0].value as string;
    const padron = interaction.options.data[1].value as string;

    await interaction.deferReply({ ephemeral: true });

    if (!emailIsValid(email) || !padronIsValid(padron)) {
        await interaction.editReply(
            'Datos ingresados inválidos (revisá que estén bien escritos y recordá que tenés que utilizar los mismos usaste para llenar el forms)'
        );
    }
 
    // await interaction.editReply(
    //     'En breve se te enviará un mail con el link para que puedas acceder a tus notas'
    // );
    await interaction.editReply('Este comando aún no está disponible :P');
};

export const data = new SlashCommandBuilder()
    .setName('notas')
    .setDescription('Send you a link')
    .addStringOption((option) =>
        option
            .setName('email')
            .setDescription('FIUBA Email Category')
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName('padrón')
            .setDescription('Padron Category')
            .setRequired(true)
    );
