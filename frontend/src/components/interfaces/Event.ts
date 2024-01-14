// for use import { Event } from './interfaces/Event';
export interface Event {
    id: number;
    name: string;
    cityRegion: string;
    date: string;
    description: string;
    raceMap: string;
    racePrices: string;
    raceTypes: string;
    registerLimit: string;
    startHours: string;
    volunteersNumber: number;
    organizer: {
        id: number;
        firstName: string;
        lastName: string;
        mail: string;
        phone: string;
    }
}