export interface Products {
    id_Products: number;
    model: string;
    description: string;
    stock: number;
    price: number;
    id_Guitar: number;
    tremolo: string | null;
    pickup: string;
    scale: number;
    frets: number;
    color: string;
    style: string;
    brand: string;
    bodyWood: string;
    neckWood: string;
    topWood: string;
    fretboardWood: string;
}