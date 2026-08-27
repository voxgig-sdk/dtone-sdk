import { DtoneEntityBase } from '../DtoneEntityBase';
import type { DtoneSDK } from '../DtoneSDK';
import type { Control } from '../types';
import type { BenefitType, BenefitTypeListMatch } from '../DtoneTypes';
declare class BenefitTypeEntity extends DtoneEntityBase<BenefitType> {
    constructor(client: DtoneSDK, entopts: any);
    make(this: BenefitTypeEntity): BenefitTypeEntity;
    list(this: any, reqmatch?: BenefitTypeListMatch, ctrl?: Control): Promise<BenefitTypeEntity[]>;
}
export { BenefitTypeEntity };
