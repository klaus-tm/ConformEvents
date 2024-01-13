// for use import { Event } from './interfaces/Event';
import {User} from "./User.ts";
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
    organizer: User;
}