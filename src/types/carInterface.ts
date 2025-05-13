type CarCategory = 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';

interface RatedUser {
    userId: string;
    rating: number;
    comment: string;
    date: Date;
}
interface RatingBreakdown {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
}

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
    ratings: {
        average: number;
        count: number;
        breakdown: RatingBreakdown;
        lastRatedAt: Date;
        ratedUsers: RatedUser[];
    }

}