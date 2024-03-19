import { HLTVConfig } from '../config';
import { Country } from '../shared/Country';
import { Team } from '../shared/Team';
import { Event } from '../shared/Event';
import { GameMap } from '../shared/GameMap';
import { Article } from '../shared/Article';
export interface FullEventTeam extends Team {
    reasonForParticipation?: string;
    rankDuringEvent?: number;
}
export interface FullEventPrizeDistribution {
    place: string;
    prize?: string;
    otherPrize?: string;
    qualifiesFor?: Event;
    team?: Team;
}
export interface FullEventFormat {
    type: string;
    description: string;
}
export interface FullEventHighlight {
    link: string;
    name: string;
    views: number;
    thumbnail: string;
    team1: Team;
    team2: Team;
}
export interface FullEvent {
    id: number;
    name: string;
    logo: string;
    dateStart?: number;
    dateEnd?: number;
    prizePool: string;
    location: Country;
    numberOfTeams?: number;
    teams: FullEventTeam[];
    prizeDistribution: FullEventPrizeDistribution[];
    relatedEvents: Event[];
    formats: FullEventFormat[];
    mapPool: GameMap[];
    highlights: FullEventHighlight[];
    news: Article[];
}
export declare const getEvent: (config: HLTVConfig) => ({ id }: {
    id: number;
}) => Promise<FullEvent>;
