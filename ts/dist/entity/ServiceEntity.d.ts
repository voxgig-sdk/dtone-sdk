import { DtoneEntityBase } from '../DtoneEntityBase';
import type { DtoneSDK } from '../DtoneSDK';
import type { Control } from '../types';
import type { Service, ServiceLoadMatch, ServiceListMatch } from '../DtoneTypes';
declare class ServiceEntity extends DtoneEntityBase<Service> {
    constructor(client: DtoneSDK, entopts: any);
    make(this: ServiceEntity): ServiceEntity;
    load(this: any, reqmatch?: ServiceLoadMatch, ctrl?: Control): Promise<ServiceEntity>;
    list(this: any, reqmatch?: ServiceListMatch, ctrl?: Control): Promise<ServiceEntity[]>;
}
export { ServiceEntity };
