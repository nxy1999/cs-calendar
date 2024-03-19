import { HLTVConfig } from '../config';
import { BestOfFilter } from '../shared/BestOfFilter';
import { Country } from '../shared/Country';
import { GameMap } from '../shared/GameMap';
import { MatchType } from '../shared/MatchType';
import { RankingFilter } from '../shared/RankingFilter';
import { Team } from '../shared/Team';
export interface PlayerStatsMatch {
    date: number;
    team1: Team;
    team2: Team;
    map: GameMap;
    kills: number;
    deaths: number;
    rating: number;
    mapStatsId: number;
}
export interface FullPlayerStats {
    id: number;
    name?: string;
    ign: string;
    image?: string;
    age?: number;
    country: Country;
    team?: Team;
    matches: PlayerStatsMatch[];
    overviewStatistics: {
        kills: number;
        headshots: number;
        deaths: number;
        kdRatio: number;
        damagePerRound?: number;
        grenadeDamagePerRound?: number;
        mapsPlayed: number;
        roundsPlayed: number;
        killsPerRound: number;
        assistsPerRound: number;
        deathsPerRound: number;
        savedByTeammatePerRound?: number;
        savedTeammatesPerRound?: number;
        rating1?: number;
        rating2?: number;
    };
    individualStatistics: {
        roundsWithKills: number;
        zeroKillRounds: number;
        oneKillRounds: number;
        twoKillRounds: number;
        threeKillRounds: number;
        fourKillRounds: number;
        fiveKillRounds: number;
        openingKills: number;
        openingDeaths: number;
        openingKillRatio: number;
        openingKillRating: number;
        teamWinPercentAfterFirstKill: number;
        firstKillInWonRounds: number;
        rifleKills: number;
        sniperKills: number;
        smgKills: number;
        pistolKills: number;
        grenadeKills: number;
        otherKills: number;
    };
}
export interface GetPlayerStatsArguments {
    id: number;
    startDate?: string;
    endDate?: string;
    matchType?: MatchType;
    rankingFilter?: RankingFilter;
    maps?: GameMap[];
    bestOfX?: BestOfFilter;
    eventIds?: number[];
}
export declare const getPlayerStats: (config: HLTVConfig) => (options: GetPlayerStatsArguments) => Promise<FullPlayerStats>;
