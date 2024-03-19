import { HLTVConfig } from '../config';
import { HLTVPage } from '../scraper';
import { GameMap } from '../shared/GameMap';
import { Team } from '../shared/Team';
import { Event } from '../shared/Event';
import { Player } from '../shared/Player';
export interface PlayerStats {
    player: Player;
    killsPerRound?: number;
    deathsPerRound?: number;
    impact?: number;
    kills: number;
    hsKills: number;
    assists: number;
    flashAssists: number;
    deaths: number;
    KAST?: number;
    killDeathsDifference: number;
    ADR?: number;
    firstKillsDifference: number;
    rating1?: number;
    rating2?: number;
}
export interface TeamPerformance {
    kills: number;
    deaths: number;
    assists: number;
}
export interface TeamsPerformanceOverview {
    team1: TeamPerformance;
    team2: TeamPerformance;
}
export declare enum Outcome {
    CTWin = "ct_win",
    TWin = "t_win",
    BombDefused = "bomb_defused",
    BombExploded = "bomb_exploded",
    TimeRanOut = "stopwatch"
}
export interface RoundOutcome {
    outcome: Outcome;
    score: string;
    tTeam: number;
    ctTeam: number;
}
interface MapHalfResult {
    team1Rounds: number;
    team2Rounds: number;
}
export interface PlayerStat extends Player {
    readonly value: number;
}
export interface TeamStatComparison {
    team1: number;
    team2: number;
}
export interface MapStatsOverview {
    rating: TeamStatComparison;
    firstKills: TeamStatComparison;
    clutchesWon: TeamStatComparison;
    mostKills: PlayerStat;
    mostDamage?: PlayerStat;
    mostAssists: PlayerStat;
    mostAWPKills: PlayerStat;
    mostFirstKills: PlayerStat;
    bestRating1?: PlayerStat;
    bestRating2?: PlayerStat;
}
export interface FullMatchMapStats {
    id: number;
    matchId: number;
    result: {
        team1TotalRounds: number;
        team2TotalRounds: number;
        halfResults: MapHalfResult[];
    };
    map: GameMap;
    date: number;
    team1: Team;
    team2: Team;
    event: Event;
    overview: MapStatsOverview;
    roundHistory: RoundOutcome[];
    playerStats: {
        team1: PlayerStats[];
        team2: PlayerStats[];
    };
    performanceOverview: TeamsPerformanceOverview;
}
export declare const getMatchMapStats: (config: HLTVConfig) => ({ id }: {
    id: number;
}) => Promise<FullMatchMapStats>;
export declare function getOverviewPropertyFromLabel(label: string): keyof MapStatsOverview | undefined;
export declare function getStatsOverview($: HLTVPage): any;
export declare function getPlayerStats(m$: HLTVPage, p$: HLTVPage): {
    team1: any[];
    team2: any[];
};
export declare function getPerformanceOverview(p$: HLTVPage): TeamsPerformanceOverview;
export {};
