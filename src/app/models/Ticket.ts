import { Filmshow } from './Filmshow';
import { User } from './User';

export class Ticket {
    ticketId: string;
    seatNumber: number;
    rowNumber: number;
    isPaid: boolean;
    userId: User;
    filmshowId: string;
    hallName: string;
    filmTitle: string;
    filmshowTime: Date;
}
