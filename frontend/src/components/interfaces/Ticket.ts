// for use import { Ticket } from './interfaces/Ticket';
export interface Ticket{
    id: number;
    event: Event;
    raceType : string;
    racePrice : string;
    user:{
        id: number;
        firstName: string;
        lastName: string;
        mail: string;
        phone: string;
    }
}