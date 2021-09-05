import { EmbedFieldData, GuildMember, Role } from 'discord.js';

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
        return this.queue.shift();
    }

    private notify(): void {
        this.observers.forEach((observer) =>
            observer.onUpdateChange(this.queue)
        );
    }

    public isEmpty(): boolean {
        return this.queue.length === 0;
    }

    public addObserver(observer: any): void {
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
                if (group) {
                    queryQueueData.push({
                        name: `#${i + 1} ${member.displayName}`,
                        value: `${group.name}`,
                    });
                } else {
                    queryQueueData.push({
                        name: `#${i} ${member}`,
                        value: `Sin grupo`,
                    });
                }
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
}
