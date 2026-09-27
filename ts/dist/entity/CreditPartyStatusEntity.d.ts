import { DtoneEntityBase } from '../DtoneEntityBase';
import type { DtoneSDK } from '../DtoneSDK';
import type { Control } from '../types';
import type { CreditPartyStatus, CreditPartyStatusCreateData } from '../DtoneTypes';
declare class CreditPartyStatusEntity extends DtoneEntityBase<CreditPartyStatus> {
    constructor(client: DtoneSDK, entopts: any);
    make(this: CreditPartyStatusEntity): CreditPartyStatusEntity;
    create(this: any, reqdata?: CreditPartyStatusCreateData, ctrl?: Control): Promise<CreditPartyStatusEntity>;
}
export { CreditPartyStatusEntity };
