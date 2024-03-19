import { HLTVConfig } from '../config';
import { Country } from '../shared/Country';
import { EventType } from '../shared/EventType';
export interface PastEventPreview {
    id: number;
    type: EventType;
    name: string;
    dateStart: number;
    dateEnd: number;
    numberOfTeams: number;
    prizePool: string;
    location: Country;
}
export interface GetPastEventsArguments {
    startDate?: string;
    endDate?: string;
    eventType?: EventType;
    prizePoolMin?: number;
    prizePoolMax?: number;
    attendingTeamIds?: number[];
    attendingPlayerIds?: number[];
    delayBetweenPageRequests?: number;
}
export declare const getPastEvents: (config: HLTVConfig) => (options: GetPastEventsArguments) => Promise<PastEventPreview[]>;
