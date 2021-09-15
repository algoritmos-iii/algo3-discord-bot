import { Config } from './interfaces/Config';
import { AlgoBot } from './client/Client';
import child_process from 'child_process';
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
};

child_process.spawn('python3', ['./scripts/bibliography_scraper.py']);

client.start(config);

export { client };
