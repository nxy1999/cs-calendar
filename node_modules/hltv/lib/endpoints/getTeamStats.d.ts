import { HLTVConfig } from '../config';
import { BestOfFilter } from '../shared/BestOfFilter';
import { GameMap } from '../shared/GameMap';
import { MatchType } from '../shared/MatchType';
import { Player } from '../shared/Player';
import { Event } from '../shared/Event';
import { RankingFilter } from '../shared/RankingFilter';
import { MatchStatsPreview } from './getMatchesStats';
export interface TeamMapStats {
    wins: number;
    draws: number;
    losses: number;
    winRate: number;
    totalRounds: number;
    roundWinPAfterFirstKill: number;
    roundWinPAfterFirstDeath: number;
}
export interface TeamStatsEvent {
    place: string;
    event: Event;
}
export interface FullTeamStats {
    id: number;
    name: string;
    overview: {
        mapsPlayed: number;
        wins: number;
        draws: number;
        losses: number;
        totalKills: number;
        totalDeaths: number;
        roundsPlayed: number;
        kdRatio: number;
    };
    currentLineup: Player[];
    historicPlayers: Player[];
    standins: Player[];
    substitutes: Player[];
    matches: MatchStatsPreview[];
    mapStats: Record<GameMap, TeamMapStats>;
    events: TeamStatsEvent[];
}
export interface GetTeamStatsArguments {
    id: number;
    currentRosterOnly?: boolean;
    startDate?: string;
    endDate?: string;
    matchType?: MatchType;
    rankingFilter?: RankingFilter;
    maps?: GameMap[];
    bestOfX?: BestOfFilter;
}
export declare const getTeamStats: (config: HLTVConfig) => (options: GetTeamStatsArguments) => Promise<FullTeamStats>;
