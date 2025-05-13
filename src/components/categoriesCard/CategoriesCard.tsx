
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia, Grid2 } from '@mui/material';
import { Link } from 'react-router-dom';
import sedan from '../../assets/carCategory/sedan.svg';
import coupe from '../../assets/carCategory/coupe.svg';
import hatchback from '../../assets/carCategory/hatchback.svg';
import suv from '../../assets/carCategory/suv.svg';
import convertible from '../../assets/carCategory/convertible.svg';
import pickup from '../../assets/carCategory/Pickup.svg';
import wagon from '../../assets/carCategory/Wagon.svg';
import van from '../../assets/carCategory/Van.svg';
import minivan from '../../assets/carCategory/Minivan.svg';
import crossover from '../../assets/carCategory/Crossover.svg';
import luxury from '../../assets/carCategory/luxury.svg';
import sports from '../../assets/carCategory/sports.svg';
import electric from '../../assets/carCategory/Electric.svg';
import hybrid from '../../assets/carCategory/hybrid.svg';
import diesel from '../../assets/carCategory/diesel.svg';

const CategoriesCard = () => {
    const carCategories = [
        { category: 'sedan', image: sedan },
        { category: 'suv', image: suv },
        { category: 'coupe', image: coupe },
        { category: 'hatchback', image: hatchback },
        { category: 'convertible', image: convertible },
        { category: 'pickup', image: pickup },
        { category: 'wagon', image: wagon },
        { category: 'van', image: van },
        { category: 'minivan', image: minivan },
        { category: 'crossover', image: crossover },
        { category: 'luxury', image: luxury },
        { category: 'sports', image: sports },
        { category: 'electric', image: electric }, // assuming hybrid image used for electric as placeholder
        { category: 'hybrid', image: hybrid },
        { category: 'diesel', image: diesel },
    ];

    return (
        <Grid2
            container rowSpacing={1} columnSpacing={{ xs: 1, sm: 3, md: 6 }}
            sx={{

            }}
        >
            {
                carCategories.map((item: { category: string; image: string }) => (
                    <Grid2
                        size={{ xs: 12, sm: 6, md: 2 }}
                        key={item.category}



                    >
                        <Link to={`/cars?category=${item?.category}`}>
                            <Card sx={{ minWidth: 60, }}>
                                <CardMedia
                                    component="img"
                                    height="100"
                                    image={`${item?.image}`}
                                    alt={item?.category}
                                    sx={{ objectFit: 'contain', padding: 2 }}
                                />
                                <CardContent sx={{ textAlign: 'center', }}>
                                    <Typography sx={{
                                        fontSize: '18px',
                                        fontWeight: 'bold'
                                    }}>
                                        {item?.category}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid2>
                ))
            }
        </Grid2>
    );
}

export default CategoriesCard;
