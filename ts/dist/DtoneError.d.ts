import { Context } from './Context';
declare class DtoneError extends Error {
    isDtoneError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { DtoneError };
