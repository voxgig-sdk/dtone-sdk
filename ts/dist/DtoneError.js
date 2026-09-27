"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DtoneError = void 0;
class DtoneError extends Error {
    isDtoneError = true;
    sdk = 'Dtone';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.DtoneError = DtoneError;
//# sourceMappingURL=DtoneError.js.map