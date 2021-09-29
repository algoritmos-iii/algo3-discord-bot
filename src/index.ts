import { Config } from './interfaces/Config';
import { AlgoBot } from './client/Client';
import dotenv from 'dotenv';
dotenv.config();

const client: AlgoBot = new AlgoBot();

const config: Config = {
    clientID: process.env.CLIENT_ID as string,
    token: process.env.TOKEN as string,
    teacherRoleID: process.env.TEACHER_ROLE_ID as string,
    studentRoleID: process.env.STUDENT_ROLE_ID as string,
    mitosisVoiceChannelID: process.env.DONNOR_VOICE_CHANNEL_ID as string,
    mitosisCategoryID: process.env.DONNOR_CATEGORY_ID as string,
    studentsQueryChannelID: process.env.STUDENTS_QUERY_CHANNEL_ID as string,
    teachersQueryChannelID: process.env.TEACHERS_QUERY_CHANNEL_ID as string,
    onlyThreadsTextChannelsIDs: process.env
        .ONLY_THREADS_TEXT_CHANNELS_ID as string,
    exercisesRepositoryURL: process.env.EXERCISES_REPOSITORY_URL as string,
    githubWebhookID: process.env.GITHUB_WEBHOOK_ID as string,
    papersTextChannelID: process.env.PAPERS_TEXT_CHANNEL_ID as string,
    validationTextChannelID: process.env.VALIDATION_TEXT_CHANNEL_ID as string,
    validatedRoleID: process.env.VALIDATED_ROLE_ID as string,
    readmeTextChannelID: process.env.README_TEXT_CHANNEL_ID as string,
    devTextChannelID: process.env.DEV_TEXT_CHANNEL_ID as string,
    devRoleID: process.env.DEV_ROLE_ID as string,
    generalTextChannelID: process.env.GENERAL_TEXT_CHANNEL_ID as string,
    teachersTextChannelID: process.env.TEACHERS_TEXT_CHANNEL_ID as string,
};

client.start(config);

export { client };
