import { DtoneEntityBase } from '../DtoneEntityBase';
import type { DtoneSDK } from '../DtoneSDK';
import type { Control } from '../types';
import type { MobileNumberLookup, MobileNumberLookupListMatch } from '../DtoneTypes';
declare class MobileNumberLookupEntity extends DtoneEntityBase<MobileNumberLookup> {
    constructor(client: DtoneSDK, entopts: any);
    make(this: MobileNumberLookupEntity): MobileNumberLookupEntity;
    list(this: any, reqmatch?: MobileNumberLookupListMatch, ctrl?: Control): Promise<MobileNumberLookupEntity[]>;
}
export { MobileNumberLookupEntity };
