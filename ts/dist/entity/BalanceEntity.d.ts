import { DtoneEntityBase } from '../DtoneEntityBase';
import type { DtoneSDK } from '../DtoneSDK';
import type { Control } from '../types';
import type { Balance, BalanceListMatch } from '../DtoneTypes';
declare class BalanceEntity extends DtoneEntityBase<Balance> {
    constructor(client: DtoneSDK, entopts: any);
    make(this: BalanceEntity): BalanceEntity;
    list(this: any, reqmatch?: BalanceListMatch, ctrl?: Control): Promise<BalanceEntity[]>;
}
export { BalanceEntity };
