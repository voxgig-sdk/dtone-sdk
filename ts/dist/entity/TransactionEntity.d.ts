import { DtoneEntityBase } from '../DtoneEntityBase';
import type { DtoneSDK } from '../DtoneSDK';
import type { Control } from '../types';
import type { Transaction, TransactionLoadMatch, TransactionListMatch, TransactionCreateData } from '../DtoneTypes';
declare class TransactionEntity extends DtoneEntityBase<Transaction> {
    constructor(client: DtoneSDK, entopts: any);
    make(this: TransactionEntity): TransactionEntity;
    load(this: any, reqmatch?: TransactionLoadMatch, ctrl?: Control): Promise<TransactionEntity>;
    list(this: any, reqmatch?: TransactionListMatch, ctrl?: Control): Promise<TransactionEntity[]>;
    create(this: any, reqdata?: TransactionCreateData, ctrl?: Control): Promise<TransactionEntity>;
}
export { TransactionEntity };
