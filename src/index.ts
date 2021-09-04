import { Config } from './interfaces/Config';
import * as File from '../config.json';
import { AlgoBot } from './client/Client';

const client: AlgoBot = new AlgoBot();

client.start(File as Config);

export { client };
