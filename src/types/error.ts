export type TErrorSource = {
    field: string;
    error: string;
}

export type TMainError = {
    statusCode: number;
    message: string;
    stack?: string;
}

export type TRegisterResponse = {
    success: boolean;
    errorSources: TErrorSource[];
    main: TMainError;
}

export type TRegisterError = {
    success: boolean;
    message: string;
    status: number;
    // Add other fields as needed
}