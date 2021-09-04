export interface ExecuteFunction {
    (...args: any): Promise<void>;
}

export interface Event {
    name: string;
    once: boolean;
    execute: ExecuteFunction;
}
