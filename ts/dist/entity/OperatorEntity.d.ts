import { DtoneEntityBase } from '../DtoneEntityBase';
import type { DtoneSDK } from '../DtoneSDK';
import type { Control } from '../types';
import type { Operator, OperatorLoadMatch, OperatorListMatch } from '../DtoneTypes';
declare class OperatorEntity extends DtoneEntityBase<Operator> {
    constructor(client: DtoneSDK, entopts: any);
    make(this: OperatorEntity): OperatorEntity;
    load(this: any, reqmatch?: OperatorLoadMatch, ctrl?: Control): Promise<OperatorEntity>;
    list(this: any, reqmatch?: OperatorListMatch, ctrl?: Control): Promise<OperatorEntity[]>;
}
export { OperatorEntity };
