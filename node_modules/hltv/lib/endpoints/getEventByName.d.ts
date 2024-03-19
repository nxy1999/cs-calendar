import { HLTVConfig } from '../config';
import { FullEvent } from './getEvent';
export declare const getEventByName: (config: HLTVConfig) => ({ name }: {
    name: string;
}) => Promise<FullEvent>;
