import { DtoneEntityBase } from '../DtoneEntityBase';
import type { DtoneSDK } from '../DtoneSDK';
import type { Control } from '../types';
import type { MobileNumber, MobileNumberLoadMatch, MobileNumberCreateData } from '../DtoneTypes';
declare class MobileNumberEntity extends DtoneEntityBase<MobileNumber> {
    constructor(client: DtoneSDK, entopts: any);
    make(this: MobileNumberEntity): MobileNumberEntity;
    load(this: any, reqmatch?: MobileNumberLoadMatch, ctrl?: Control): Promise<MobileNumberEntity>;
    create(this: any, reqdata?: MobileNumberCreateData, ctrl?: Control): Promise<MobileNumberEntity>;
}
export { MobileNumberEntity };
