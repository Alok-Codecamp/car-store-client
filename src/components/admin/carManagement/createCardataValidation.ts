import z from 'zod';



const createCardataValidation = z.object({
    brand: z.string().min(1, { message: "Brand is required!" }),
    model: z.string().min(1, { message: "Model is required!" }),
    year: z.string().min(1, { message: "Year is required!" }),
    price: z.string().min(1, { message: "Price is required!" }),
    quantity: z.string().min(1, { message: "Quantity is required!" }),
    category: z.string().min(1, { message: "Category is required!" }),
    description: z.string().min(1, { message: "Description is required!" }),
    photoUrl: z.string().min(1, { message: "InStock is required!" }),
});
const updateCardataValidation = z.object({
    brand: z.string().optional(),
    model: z.string().optional(),
    year: z.string().optional(),
    price: z.string().optional(),
    quantity: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    photoUrl: z.string().optional(),
});


export const cardataValidationSchema = {
    createCardataValidation,
    updateCardataValidation
}