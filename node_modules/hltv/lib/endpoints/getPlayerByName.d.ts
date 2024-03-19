import { HLTVConfig } from '../config';
import { FullPlayer } from './getPlayer';
export declare const getPlayerByName: (config: HLTVConfig) => ({ name }: {
    name: string;
}) => Promise<FullPlayer>;
