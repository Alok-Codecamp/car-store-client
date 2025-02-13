import { ReactNode } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

export type TFormConfig = {
    defaultValues?: Record<string, any>;
    resolver?: any;
};

export type TFromProps = {
    onSubmit: SubmitHandler<FieldValues>;
    children: ReactNode;
} & TFormConfig;

