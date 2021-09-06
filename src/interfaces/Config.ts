export interface Config {
    validatedRoleID: string;
    readmeTextChannelID: string;
    clientID: string;
    token: string;
    teacherRoleID: string;
    studentRoleID: string;
    mitosisVoiceChannelID: string;
    mitosisCategoryID: string;
    studentsQueryChannelID: string;
    teachersQueryChannelID: string;
    onlyThreadsTextChannelsIDs: string[];
    exercisesRepositoryURL: string;
    githubWebhookID: string;
}
