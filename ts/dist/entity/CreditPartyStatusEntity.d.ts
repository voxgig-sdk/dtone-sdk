import { DtoneEntityBase } from '../DtoneEntityBase';
import type { DtoneSDK } from '../DtoneSDK';
import type { Control } from '../types';
import type { CreditPartyStatus, CreditPartyStatusLoadMatch } from '../DtoneTypes';
declare class CreditPartyStatusEntity extends DtoneEntityBase<CreditPartyStatus> {
    constructor(client: DtoneSDK, entopts: any);
    make(this: CreditPartyStatusEntity): CreditPartyStatusEntity;
    load(this: any, reqmatch?: CreditPartyStatusLoadMatch, ctrl?: Control): Promise<CreditPartyStatusEntity>;
}
export { CreditPartyStatusEntity };
