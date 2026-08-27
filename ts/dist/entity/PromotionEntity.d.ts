import { DtoneEntityBase } from '../DtoneEntityBase';
import type { DtoneSDK } from '../DtoneSDK';
import type { Control } from '../types';
import type { Promotion, PromotionLoadMatch, PromotionListMatch } from '../DtoneTypes';
declare class PromotionEntity extends DtoneEntityBase<Promotion> {
    constructor(client: DtoneSDK, entopts: any);
    make(this: PromotionEntity): PromotionEntity;
    load(this: any, reqmatch?: PromotionLoadMatch, ctrl?: Control): Promise<PromotionEntity>;
    list(this: any, reqmatch?: PromotionListMatch, ctrl?: Control): Promise<PromotionEntity[]>;
}
export { PromotionEntity };
