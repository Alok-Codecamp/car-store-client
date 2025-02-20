import z from 'zod';




const loginDataValidationSchema = z.object({
    email: z.string().min(1, 'Email is required!'),
    password: z.string().min(1, 'Password is required!'),
})
const registerDataValidationSchema = z.object({

    name: z.string().min(1, 'Name is required!'),
    email: z.string().min(1, 'Email is required!'),
    password: z.string().min(1, 'Password is required!'),
})

const passwordValidationSchema = z.object({
    oldPassword: z.string({ required_error: 'old password is required' }).min(6, 'minimum 6 charecter'),
    newPassword: z.string({ required_error: 'new password is required' }).min(6, 'minimum 6 charecter'),
    confirmPassword: z.string({ required_error: 'confirm password is required' }).min(6, 'minimum 6 charecter')
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password must match",
    path: ["confirmPassword"],
});

const forgetPasswordValidatonSchema = z.object({

    email: z.string().min(1, 'Email is required!'),

})

const resetPasswordValidationSchema = z.object({
    newPassword: z.string({ required_error: 'new password is required' }).min(6, 'minimum 6 charecter'),
    confirmPassword: z.string({ required_error: 'confirm password is required' }).min(6, 'minimum 6 charecter')
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password must match",
    path: ["confirmPassword"],
});

export const userDataValidation = { loginDataValidationSchema, registerDataValidationSchema, passwordValidationSchema, forgetPasswordValidatonSchema, resetPasswordValidationSchema };
