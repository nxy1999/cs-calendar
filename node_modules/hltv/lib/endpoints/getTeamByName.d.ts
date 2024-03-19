import { HLTVConfig } from '../config';
import { FullTeam } from './getTeam';
export declare const getTeamByName: (config: HLTVConfig) => ({ name }: {
    name: string;
}) => Promise<FullTeam>;
