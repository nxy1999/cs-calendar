import { HLTVConfig } from './config';
export declare class Hltv {
    private config;
    constructor(config?: Partial<HLTVConfig>);
    getMatch: ({ id }: {
        id: number;
    }) => Promise<import("./endpoints/getMatch").FullMatch>;
    getMatches: ({ eventIds, eventType, filter, teamIds }?: import("./endpoints/getMatches").GetMatchesArguments) => Promise<import("./endpoints/getMatches").MatchPreview[]>;
    getEvent: ({ id }: {
        id: number;
    }) => Promise<import("./endpoints/getEvent").FullEvent>;
    getEvents: (options?: import("./endpoints/getEvents").GetEventsArguments) => Promise<import("./endpoints/getEvents").EventPreview[]>;
    getPastEvents: (options: import("./endpoints/getPastEvents").GetPastEventsArguments) => Promise<import("./endpoints/getPastEvents").PastEventPreview[]>;
    getEventByName: ({ name }: {
        name: string;
    }) => Promise<import("./endpoints/getEvent").FullEvent>;
    getMatchMapStats: ({ id }: {
        id: number;
    }) => Promise<import("./endpoints/getMatchMapStats").FullMatchMapStats>;
    getMatchStats: ({ id }: {
        id: number;
    }) => Promise<import("./endpoints/getMatchStats").FullMatchStats>;
    getMatchesStats: (options?: import("./endpoints/getMatchesStats").GetMatchesStatsArguments) => Promise<import("./endpoints/getMatchesStats").MatchStatsPreview[]>;
    getPlayer: ({ id }: {
        id: number;
    }) => Promise<import("./endpoints/getPlayer").FullPlayer>;
    getPlayerByName: ({ name }: {
        name: string;
    }) => Promise<import("./endpoints/getPlayer").FullPlayer>;
    getPlayerRanking: (options?: import("./endpoints/getPlayerRanking").GetPlayerRankingOptions) => Promise<import("./endpoints/getPlayerRanking").PlayerRanking[]>;
    getPlayerStats: (options: import("./endpoints/getPlayerStats").GetPlayerStatsArguments) => Promise<import("./endpoints/getPlayerStats").FullPlayerStats>;
    getRecentThreads: () => Promise<import("./endpoints/getRecentThreads").Thread[]>;
    getStreams: () => Promise<import("./endpoints/getStreams").FullStream[]>;
    getTeam: ({ id }: {
        id: number;
    }) => Promise<import("./endpoints/getTeam").FullTeam>;
    getTeamByName: ({ name }: {
        name: string;
    }) => Promise<import("./endpoints/getTeam").FullTeam>;
    getTeamRanking: ({ year, month, day, country }?: import("./endpoints/getTeamRanking").GetTeamArguments) => Promise<import("./endpoints/getTeamRanking").TeamRanking[]>;
    getTeamStats: (options: import("./endpoints/getTeamStats").GetTeamStatsArguments) => Promise<import("./endpoints/getTeamStats").FullTeamStats>;
    getResults: (options: import("./endpoints/getResults").GetResultsArguments) => Promise<import("./endpoints/getResults").FullMatchResult[]>;
    getNews: ({ year, month, eventIds }?: import("./endpoints/getNews").GetNewsArguments) => Promise<import("./endpoints/getNews").NewsPreview[]>;
    connectToScorebot: ({ id, onScoreboardUpdate, onLogUpdate, onFullLogUpdate, onConnect, onDisconnect }: {
        id: number;
        onScoreboardUpdate?: ((data: import("./endpoints/connectToScorebot").ScoreboardUpdate, done: () => void) => any) | undefined;
        onLogUpdate?: ((data: import("./endpoints/connectToScorebot").LogUpdate, done: () => void) => any) | undefined;
        onFullLogUpdate?: ((data: unknown, done: () => void) => any) | undefined;
        onConnect?: (() => any) | undefined;
        onDisconnect?: (() => any) | undefined;
    }) => void;
    createInstance(config: Partial<HLTVConfig>): Hltv;
    TEAM_PLACEHOLDER_IMAGE: string;
    PLAYER_PLACEHOLDER_IMAGE: string;
}
declare const hltv: Hltv;
export default hltv;
export { hltv as HLTV };
export { MatchStatus } from './endpoints/getMatch';
export type { Demo, Highlight, Veto, HeadToHeadResult, ProviderOdds, MapHalfResult, MapResult, Stream, FullMatch as Match } from './endpoints/getMatch';
export { MatchEventType, MatchFilter } from './endpoints/getMatches';
export type { MatchPreview, GetMatchesArguments } from './endpoints/getMatches';
export { WinType } from './endpoints/connectToScorebot';
export type { ScoreboardUpdate, LogUpdate } from './endpoints/connectToScorebot';
export type { FullEvent, FullEventHighlight, FullEventFormat, FullEventPrizeDistribution, FullEventTeam } from './endpoints/getEvent';
export type { EventPreview, GetEventsArguments } from './endpoints/getEvents';
export type { FullMatchStats } from './endpoints/getMatchStats';
export type { GetMatchesStatsArguments, MatchStatsPreview } from './endpoints/getMatchesStats';
export type { FullPlayerTeam, PlayerAchievement, FullPlayer } from './endpoints/getPlayer';
export type { PlayerRanking, GetPlayerRankingOptions } from './endpoints/getPlayerRanking';
export type { FullPlayerStats, GetPlayerStatsArguments } from './endpoints/getPlayerStats';
export { ThreadCategory } from './endpoints/getRecentThreads';
export type { Thread } from './endpoints/getRecentThreads';
export { StreamCategory } from './endpoints/getStreams';
export type { FullStream } from './endpoints/getStreams';
export { TeamPlayerType } from './endpoints/getTeam';
export type { FullTeam, FullTeamPlayer } from './endpoints/getTeam';
export type { TeamRanking, GetTeamArguments } from './endpoints/getTeamRanking';
export type { GetPastEventsArguments } from './endpoints/getPastEvents';
export { ResultsMatchType, ContentFilter, GameType } from './endpoints/getResults';
export type { FullMatchResult, ResultTeam, GetResultsArguments } from './endpoints/getResults';
export type { NewsPreview, GetNewsArguments } from './endpoints/getNews';
export { GameMap } from './shared/GameMap';
export { MatchFormat } from './shared/MatchFormat';
export { RankingFilter } from './shared/RankingFilter';
export { MatchType } from './shared/MatchType';
export { BestOfFilter } from './shared/BestOfFilter';
export type { Article } from './shared/Article';
export type { Country } from './shared/Country';
export type { Event } from './shared/Event';
export type { Player } from './shared/Player';
export type { Team } from './shared/Team';
export type { EventType } from './shared/EventType';
