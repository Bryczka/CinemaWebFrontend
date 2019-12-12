import { Ticket } from './Ticket';
import { Hall } from './Hall';
import { Film } from './Film';

export class Filmshow {
    filmshowId: string;
    filmshowTime: Date;
    filmId: string;
    filmTitle: string;
    hallId: string;
    hallName: string;
    tickets: Array<Ticket>;
}
