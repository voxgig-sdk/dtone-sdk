import { DtoneEntityBase } from '../DtoneEntityBase';
import type { DtoneSDK } from '../DtoneSDK';
import type { Control } from '../types';
import type { CreditPartyBenefit, CreditPartyBenefitListMatch } from '../DtoneTypes';
declare class CreditPartyBenefitEntity extends DtoneEntityBase<CreditPartyBenefit> {
    constructor(client: DtoneSDK, entopts: any);
    make(this: CreditPartyBenefitEntity): CreditPartyBenefitEntity;
    list(this: any, reqmatch?: CreditPartyBenefitListMatch, ctrl?: Control): Promise<CreditPartyBenefitEntity[]>;
}
export { CreditPartyBenefitEntity };
