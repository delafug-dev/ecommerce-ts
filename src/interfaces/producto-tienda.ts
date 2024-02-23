

export interface Producto {
    id:          string;
    title:       string;
    price:       number;
    description: string;
    category:    string;
    image:       string;
    quantity?:    number;
    rating?:      Rating;
}


export interface Rating {
    rate:  number;
    count: number;
}
