export interface ExecuteFunction {
    (interaction: any): Promise<void>;
}

export interface Command {
    name: string;
    once: boolean;
    execute: ExecuteFunction;
}
