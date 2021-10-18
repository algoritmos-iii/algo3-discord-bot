import { EmbedFieldData, GuildMember, Role } from 'discord.js';
import { EmbedPage } from './EmbedPage';

export class QueryQueue {
    queue: GuildMember[];
    observers: any[];

    constructor() {
        this.queue = [];
        this.observers = [];
    }

    public enqueue(member: GuildMember): void {
        this.queue.push(member);
        this.notify();
    }

    public next(): GuildMember | undefined {
        const next = this.queue.shift();
        this.notify();
        return next;
    }

    private notify(): void {
        this.observers.forEach((observer) => observer.onUpdate(this));
    }

    public isEmpty(): boolean {
        return this.queue.length === 0;
    }

    public addObserver(observer: EmbedPage): void {
        this.observers.push(observer);
    }

    public removeObserver(observer: any): void {
        this.observers = this.observers.filter((item) => item !== observer);
    }

    public clear(): void {
        this.queue = [];
        this.notify();
    }

    public size(): number {
        return this.queue.length;
    }

    public splice(index: number, count: number): void {
        this.queue.splice(index, count);
        this.notify();
    }

    public indexOf(member: GuildMember): number {
        return this.queue.indexOf(member);
    }

    public get(index: number): GuildMember | undefined {
        return this.queue[index];
    }

    public toEmbedFieldData(): EmbedFieldData[] {
        const queryQueueData: EmbedFieldData[] = [];

        for (let i = 0; i < this.size(); i++) {
            const member = this.get(i);
            if (member) {
                const group = member.roles.cache.find((role) =>
                    role.name.startsWith('Grupo')
                );
                queryQueueData.push({
                    name: `#${i + 1} ${member.displayName}`,
                    value: `${group ? group.name : `Sin grupo`}`,
                });
            }
        }

        return queryQueueData;
    }

    public membersOfGroup(group: Role): GuildMember[] {
        return this.queue.filter((member) =>
            member.roles.cache.some((role) => role.name === group.name)
        );
    }

    public hasSomeMemberOf(ofGroup: Role): boolean {
        return this.queue.some((member) =>
            member.roles.cache.some((role) => role.name === ofGroup.name)
        );
    }

    public has(member: GuildMember): boolean {
        return this.queue.some(
            (enqueuedMember) => enqueuedMember.id === member.id
        );
    }

    public deleteMember(member: GuildMember): void {
        const memberIndex = this.indexOf(member);
        if (memberIndex !== -1) {
            this.splice(memberIndex, 1);
            this.notify();
        }
    }
}
