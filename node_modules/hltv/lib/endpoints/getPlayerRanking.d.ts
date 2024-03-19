import { HLTVConfig } from '../config';
import { BestOfFilter } from '../shared/BestOfFilter';
import { GameMap } from '../shared/GameMap';
import { MatchType } from '../shared/MatchType';
import { Player } from '../shared/Player';
import { RankingFilter } from '../shared/RankingFilter';
import { Team } from '../shared/Team';
export interface PlayerRanking {
    player: Player;
    teams: Team[];
    maps: number;
    kdDiff: number;
    rounds: number;
    kd: number;
    rating1?: number;
    rating2?: number;
}
export interface GetPlayerRankingOptions {
    startDate?: string;
    endDate?: string;
    matchType?: MatchType;
    rankingFilter?: RankingFilter;
    maps?: GameMap[];
    minMapCount?: number;
    countries?: string[];
    bestOfX?: BestOfFilter;
}
export declare const getPlayerRanking: (config: HLTVConfig) => (options?: GetPlayerRankingOptions) => Promise<PlayerRanking[]>;
