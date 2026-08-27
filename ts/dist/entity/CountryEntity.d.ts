import { DtoneEntityBase } from '../DtoneEntityBase';
import type { DtoneSDK } from '../DtoneSDK';
import type { Control } from '../types';
import type { Country, CountryLoadMatch, CountryListMatch } from '../DtoneTypes';
declare class CountryEntity extends DtoneEntityBase<Country> {
    constructor(client: DtoneSDK, entopts: any);
    make(this: CountryEntity): CountryEntity;
    load(this: any, reqmatch?: CountryLoadMatch, ctrl?: Control): Promise<CountryEntity>;
    list(this: any, reqmatch?: CountryListMatch, ctrl?: Control): Promise<CountryEntity[]>;
}
export { CountryEntity };
