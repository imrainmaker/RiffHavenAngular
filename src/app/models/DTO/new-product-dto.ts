export interface NewProductDTO {
    model: string;
    description: string;
    stock: number;
    price: number;
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