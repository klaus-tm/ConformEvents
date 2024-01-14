// for use import { VPass } from './interfaces/VPass';
import { Event } from './Event';
export interface VPass{
    id: number;
    event: Event;
    volunteer:{
        id: number;
        firstName: string;
        lastName: string;
        mail: string;
        phone: string;
    }
}