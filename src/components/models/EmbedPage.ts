import {
    Collection,
    EmbedFieldData,
    Message,
    MessageActionRow,
    MessageActionRowOptions,
    MessageEmbed,
    TextChannel,
} from 'discord.js';
import { AlgoBot } from '../../client/Client';
import { QueryQueue } from './QueryQueue';

export class EmbedPage {
    public client: AlgoBot;
    public data: MessageEmbed;
    public name: string;
    public components!:
        | (MessageActionRow | MessageActionRowOptions)[]
        | undefined;
    public targetChannels!: TextChannel[];
    public content: string | null;
    public autoSend: boolean;
    public edit: boolean;
    public cleanChatHistory: boolean;

    constructor(
        client: AlgoBot,
        autoSend: boolean,
        edit: boolean,
        cleanChatHistory: boolean,
        name: string,
        title: string,
        description: string = '',
        targetChannelsIDs: string[],
        fieldsData: EmbedFieldData[] | null = null,
        buttons: string[] | null = null,
        url: string | null = null,
        content: string | null = null
    ) {
        this.client = client;
        this.name = name;
        this.content = content;
        this.autoSend = autoSend;
        this.edit = edit;
        this.cleanChatHistory = cleanChatHistory;
        this.targetChannels = this.channelsFromIDs(targetChannelsIDs);
        this.data = this.buildData(title, description, fieldsData, url);
        this.components = this.buildComponents(buttons);
    }

    private channelsFromIDs(targetChannelsIDs: string[]): TextChannel[] {
        return targetChannelsIDs.map(
            (id) => this.client.channels.cache.get(id) as TextChannel
        );
    }

    private buildComponents(buttons: string[] | null) {
        const row = new MessageActionRow();
        if (buttons) {
            return [row.addComponents(this.buttomsFromKeys(buttons))];
        }
        return undefined;
    }

    private buttomsFromKeys(buttons: string[]) {
        return buttons.map(
            (buttonName) => this.client.buttons.get(buttonName)!.data
        );
    }

    private buildData(
        title: string,
        description: string,
        fieldsData: EmbedFieldData[] | null,
        url: string | null
    ) {
        const data = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(title)
            .setDescription(description);
        if (fieldsData) {
            data.addFields(fieldsData);
        }
        if (url) {
            data.setURL(url);
        }
        return data;
    }

    private buildMessageContent() {
        if (this.components) {
            return {
                embeds: [this.data],
                components: this.components,
            };
        } else if (this.content) {
            return {
                embeds: [this.data],
                content: this.content,
            };
        } else if (this.content && this.components) {
            return {
                embeds: [this.data],
                content: this.content,
                components: this.components,
            };
        }
        return {
            embeds: [this.data],
        };
    }

    public async send(): Promise<void> {
        for (const targetChannel of this.targetChannels) {
            const previousMessages = await targetChannel.messages.fetch();

            const messageContent = this.buildMessageContent();

            if (this.targetChannelIsNotEmpty(previousMessages) && this.edit) {
                await previousMessages.first()!.edit(messageContent);
            } else if (this.targetChannelIsNotEmpty(previousMessages) && this.cleanChatHistory){
                await previousMessages.first()!.delete();
                await targetChannel.send(messageContent);
            } else {
                await targetChannel.send(messageContent);
            }
        }
    }

    private targetChannelIsNotEmpty(
        previousMessages: Collection<string, Message>
    ) {
        return previousMessages.size != 0;
    }

    public onUpdate(newQueue: QueryQueue) {
        this.data = this.buildData(
            this.data.title!,
            this.data.description!,
            newQueue.toEmbedFieldData(),
            this.data.url
        );
        this.send();
    }
}
