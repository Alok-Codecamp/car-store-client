import { Search } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";



type FormData = {
    search: string;
};
const SearchForm = ({ formHeight, formWidth }: { formHeight: number; formWidth: number }) => {
    const { register, handleSubmit, reset } = useForm<FormData>()
    const navigate = useNavigate();

    // handle form submit function 
    const onSubmit = (data: FormData) => {
        console.log(data);
        navigate(`/cars?searchTerm=${data.search}`)
        reset();
    }
    return (

        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{
                width: `${formWidth}ch`,

            }}>
                <OutlinedInput sx={{
                    height: formHeight,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'lithGray', // default border color
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FF3B4B', // hover border
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FF3B4B', // focus border
                        borderWidth: '2px',
                    },
                }}  {...register('search')} placeholder="Search car"

                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton type="submit" edge="end" sx={{ color: '#FF3B4B' }}>
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </form>

    );
}

export default SearchForm;
