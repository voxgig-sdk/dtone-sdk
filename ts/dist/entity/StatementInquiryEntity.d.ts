import { DtoneEntityBase } from '../DtoneEntityBase';
import type { DtoneSDK } from '../DtoneSDK';
import type { Control } from '../types';
import type { StatementInquiry, StatementInquiryListMatch } from '../DtoneTypes';
declare class StatementInquiryEntity extends DtoneEntityBase<StatementInquiry> {
    constructor(client: DtoneSDK, entopts: any);
    make(this: StatementInquiryEntity): StatementInquiryEntity;
    list(this: any, reqmatch?: StatementInquiryListMatch, ctrl?: Control): Promise<StatementInquiryEntity[]>;
}
export { StatementInquiryEntity };
