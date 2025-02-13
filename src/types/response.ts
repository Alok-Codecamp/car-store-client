import { ICars } from "./carInterface";

export type TResponseData = {
    data: {
        statusCode: number;
        success: boolean;
        message: string;
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPage: number;
        };
        data: ICars[]; // ✅ The actual array
    };
};
