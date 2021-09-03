import consola from 'consola';
import { ExecuteFunction } from '../interfaces/Event';

export const execute: ExecuteFunction = async (error: Error) => {
    consola.error(error);
};

export const name: string = 'error';
