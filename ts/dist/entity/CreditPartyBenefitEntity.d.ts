import { DtoneEntityBase } from '../DtoneEntityBase';
import type { DtoneSDK } from '../DtoneSDK';
import type { Control } from '../types';
import type { CreditPartyBenefit, CreditPartyBenefitCreateData } from '../DtoneTypes';
declare class CreditPartyBenefitEntity extends DtoneEntityBase<CreditPartyBenefit> {
    constructor(client: DtoneSDK, entopts: any);
    make(this: CreditPartyBenefitEntity): CreditPartyBenefitEntity;
    create(this: any, reqdata?: CreditPartyBenefitCreateData, ctrl?: Control): Promise<CreditPartyBenefitEntity>;
}
export { CreditPartyBenefitEntity };
