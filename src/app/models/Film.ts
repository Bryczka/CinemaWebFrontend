import { Filmshow } from './Filmshow';

export class Film {
    filmId: string;
    title: string;
    category: string;
    length: string;
    rating: number;
    description: string;
    imageBase64: string;
    filmshows: Array<Filmshow>;
}
