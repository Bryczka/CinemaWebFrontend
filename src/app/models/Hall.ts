import { Seat } from './Seat';
import { Filmshow } from './Filmshow';

export class Hall {
    hallId: string;
    name: string;
    rowsNumber: number;
    seatsInRowNumber: number;
    seats: Array<Seat>;
    filmshows: Array<Filmshow>;
}
