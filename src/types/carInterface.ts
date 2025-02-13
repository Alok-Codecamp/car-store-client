type CarCategory = 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';



export interface ICars {
    _id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    category: CarCategory;
    description: string;
    quantity: number;
    inStock: boolean
    photoUrl: string;

}