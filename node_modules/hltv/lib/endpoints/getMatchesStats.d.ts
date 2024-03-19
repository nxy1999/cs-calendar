import { HLTVConfig } from '../config';
import { GameMap } from '../shared/GameMap';
import { Team } from '../shared/Team';
import { Event } from '../shared/Event';
import { RankingFilter } from '../shared/RankingFilter';
import { MatchType } from '../shared/MatchType';
export interface GetMatchesStatsArguments {
    startDate?: string;
    endDate?: string;
    matchType?: MatchType;
    maps?: GameMap[];
    rankingFilter?: RankingFilter;
    delayBetweenPageRequests?: number;
}
export interface MatchStatsPreview {
    mapStatsId: number;
    date: number;
    team1: Team;
    team2: Team;
    event: Event;
    map: GameMap;
    result: {
        team1: number;
        team2: number;
    };
}
export declare const getMatchesStats: (config: HLTVConfig) => (options?: GetMatchesStatsArguments) => Promise<MatchStatsPreview[]>;
