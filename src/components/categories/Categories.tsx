import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";


const Categories = () => {
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
        <Box sx={{
            display: {
                xs: 'none',
                sm: 'flex'
            },
            backgroundColor: '#ff3b4b',
            color: "white",
            paddingTop: "3px",
            paddingBottom: '3px',
            paddingLeft: '24px'


        }}
            component="nav"
        >
            {carCategories.map((category) => (
                <NavLink
                    key={category}
                    to={`/cars?category=${category}`}
                    className={({ isActive }) =>
                        isActive
                            ? "text-blue-500 font-semibold underline"
                            : "text-gray-600"
                    }
                    style={{
                        marginLeft: '15px',
                        marginRight: '15px'

                    }}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </NavLink>
            ))}
        </Box>
    );
}

export default Categories;
