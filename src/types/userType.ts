export type TDecoded = {
    email: string;
    role: 'admin' | 'user';
    exp: number;
    iat: number;
}