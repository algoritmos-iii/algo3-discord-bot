import consola from 'consola';
import { ExecuteFunction } from '../interfaces/Event';

export const execute: ExecuteFunction = async (error: Error) => {
    consola.warn(error);
};

export const name: string = 'warn';
