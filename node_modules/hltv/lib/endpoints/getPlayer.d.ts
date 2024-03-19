import { HLTVConfig } from '../config';
import { Country } from '../shared/Country';
import { Team } from '../shared/Team';
import { Event } from '../shared/Event';
import { Article } from '../shared/Article';
export interface FullPlayerTeam extends Team {
    startDate: number;
    leaveDate?: number;
    trophies: Event[];
}
export interface PlayerAchievement {
    event: Event;
    place: string;
}
export interface FullPlayer {
    id: number;
    name?: string;
    ign: string;
    image?: string;
    age?: number;
    country: Country;
    team?: Team;
    twitter?: string;
    twitch?: string;
    facebook?: string;
    instagram?: string;
    statistics?: {
        rating: number;
        killsPerRound: number;
        headshots: number;
        mapsPlayed: number;
        deathsPerRound: number;
        roundsContributed: number;
    };
    teams: FullPlayerTeam[];
    achievements: PlayerAchievement[];
    news: Article[];
}
export declare const getPlayer: (config: HLTVConfig) => ({ id }: {
    id: number;
}) => Promise<FullPlayer>;
