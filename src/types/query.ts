import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
    data: {
        message: string;
        stack?: string;
        success: boolean;
    },
    status: number
}


export type TQueryParam = {
    name: string;
    value: string | React.Key | Record<string, unknown>;
};

export type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}

export type TResponse<T> = {
    success: boolean;
    message: string;
    data: T;
    error: TError;
    meta: TMeta;

}

export type TReduxResponse<T> = TResponse<T> & BaseQueryApi;