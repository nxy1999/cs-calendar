import { HLTVConfig } from '../config';
import { Team } from '../shared/Team';
import { Event } from '../shared/Event';
export declare enum MatchEventType {
    All = "All",
    LAN = "Lan",
    Online = "Online"
}
export declare enum MatchFilter {
    LanOnly = "lan_only",
    TopTier = "top_tier"
}
export interface GetMatchesArguments {
    eventIds?: number[];
    eventType?: MatchEventType;
    filter?: MatchFilter;
    teamIds?: number[];
}
export interface MatchPreview {
    id: number;
    team1?: Team;
    team2?: Team;
    date?: number;
    format?: string;
    event?: Event;
    title?: string;
    live: boolean;
    stars: number;
}
export declare const getMatches: (config: HLTVConfig) => ({ eventIds, eventType, filter, teamIds }?: GetMatchesArguments) => Promise<MatchPreview[]>;
