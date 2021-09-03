import consola from 'consola';
import { ExecuteFunction } from '../interfaces/Event';

export const execute: ExecuteFunction = async (error: Error) => {
    consola.debug(error);
};

export const name: string = 'debug';
