export interface ExecuteFunction {
    (...args: any): Promise<void>;
}

export interface Command {
    name: string;
    once: boolean;
    execute: ExecuteFunction;
}
