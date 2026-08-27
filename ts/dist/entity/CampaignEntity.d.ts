import { DtoneEntityBase } from '../DtoneEntityBase';
import type { DtoneSDK } from '../DtoneSDK';
import type { Control } from '../types';
import type { Campaign, CampaignLoadMatch, CampaignListMatch } from '../DtoneTypes';
declare class CampaignEntity extends DtoneEntityBase<Campaign> {
    constructor(client: DtoneSDK, entopts: any);
    make(this: CampaignEntity): CampaignEntity;
    load(this: any, reqmatch?: CampaignLoadMatch, ctrl?: Control): Promise<CampaignEntity>;
    list(this: any, reqmatch?: CampaignListMatch, ctrl?: Control): Promise<CampaignEntity[]>;
}
export { CampaignEntity };
