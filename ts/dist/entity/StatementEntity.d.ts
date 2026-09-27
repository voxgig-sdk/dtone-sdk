import { DtoneEntityBase } from '../DtoneEntityBase';
import type { DtoneSDK } from '../DtoneSDK';
import type { Control } from '../types';
import type { Statement, StatementCreateData } from '../DtoneTypes';
declare class StatementEntity extends DtoneEntityBase<Statement> {
    constructor(client: DtoneSDK, entopts: any);
    make(this: StatementEntity): StatementEntity;
    create(this: any, reqdata?: StatementCreateData, ctrl?: Control): Promise<StatementEntity>;
}
export { StatementEntity };
