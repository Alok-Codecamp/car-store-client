
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid2 } from '@mui/material';
import { Link } from 'react-router-dom';


const CategoriesCard = () => {
    const carCategories = [
        "sedan",
        "suv",
        "coupe",
        "hatchback",
        "convertible",
        "pickup",
        "wagon",
        "van",
        "minivan",
        "crossover",
        "luxury",
        "sports",
        "electric",
        "hybrid",
        "diesel"
    ];
    return (
        <Grid2
            container rowSpacing={1} columnSpacing={{ xs: 1, sm: 3, md: 6 }}
            sx={{

            }}
        >
            {
                carCategories.map((category: string) => (
                    <Grid2
                        size={{ xs: 12, sm: 6, md: 2 }}
                        key={category}



                    >
                        <Link to={`/cars?category=${category}`}>
                            <Card sx={{ minWidth: 60, }}>
                                <CardContent sx={{ textAlign: 'center', }}>
                                    <Typography>
                                        {category}
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
