import { HLTVConfig } from '../config';
import { Country } from '../shared/Country';
import { EventType } from '../shared/EventType';
export interface EventPreview {
    id: number;
    name: string;
    dateStart: number;
    dateEnd: number;
    numberOfTeams?: number;
    prizePool?: string;
    location?: Country;
    featured: boolean;
}
export interface GetEventsArguments {
    eventType?: EventType;
    prizePoolMin?: number;
    prizePoolMax?: number;
    attendingTeamIds?: number[];
    attendingPlayerIds?: number[];
}
export declare const getEvents: (config: HLTVConfig) => (options?: GetEventsArguments) => Promise<EventPreview[]>;
