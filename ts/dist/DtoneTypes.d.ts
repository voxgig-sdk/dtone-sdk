export interface Balance {
    available: number;
    credit_limit: number;
    holding: number;
    id: number;
    unit: string;
    unit_type: string;
}
export interface BalanceListMatch {
    page?: number;
    per_page?: number;
    unit?: string;
    unit_type?: string;
}
export interface BenefitType {
    name: string;
}
export interface BenefitTypeListMatch {
    page?: number;
    per_page?: number;
}
export interface Campaign {
    description: string;
    end_date: string;
    id: number;
    products: any[];
    start_date: string;
    terms: string;
    title: string;
}
export interface CampaignLoadMatch {
    id: number;
}
export interface CampaignListMatch {
    country_iso_code?: string;
    operator_id?: number;
    page?: number;
    per_page?: number;
    product_id?: number;
}
export interface Country {
    id?: string;
    iso_code: string;
    name: string;
    regions: any[];
}
export interface CountryLoadMatch {
    id: string;
}
export interface CountryListMatch {
    page?: number;
    per_page?: number;
    service_id?: number;
    subservice_id?: number;
}
export interface CreditPartyBenefit {
    credit_party_identifier: Record<string, any>;
    page?: number;
    per_page?: number;
    service_id: number;
}
export interface CreditPartyBenefitCreateData {
    credit_party_identifier: Record<string, any>;
    page?: number;
    per_page?: number;
    service_id: number;
}
export interface CreditPartyStatus {
    activation_date: string;
    credit_party_identifier: Record<string, any>;
    installation_date: string;
    service_id: number;
}
export interface CreditPartyStatusCreateData {
    activation_date: string;
    credit_party_identifier: Record<string, any>;
    installation_date: string;
    service_id: number;
}
export interface MobileNumber {
    id?: string;
    mobile_number: string;
    page?: number;
    per_page?: number;
}
export interface MobileNumberLoadMatch {
    id: string;
    page?: number;
    per_page?: number;
}
export interface MobileNumberCreateData {
    id?: string;
    mobile_number: string;
    page?: number;
    per_page?: number;
}
export interface Operator {
    country: Record<string, any>;
    id: number;
    name: string;
    regions: any[];
}
export interface OperatorLoadMatch {
    id: number;
}
export interface OperatorListMatch {
    country_iso_code?: string;
    page?: number;
    per_page?: number;
    service_id?: number;
    subservice_id?: number;
}
export interface Product {
    id?: string;
}
export interface ProductLoadMatch {
    id: number;
}
export interface ProductListMatch {
    benefit_type?: any[];
    country_iso_code?: string;
    operator_id?: number;
    page?: number;
    per_page?: number;
    region?: string;
    service_id?: number;
    sort?: string;
    subservice_id?: number;
    tag?: any[];
    type?: string;
}
export interface Promotion {
    description: string;
    end_date: string;
    id: number;
    operator: Record<string, any>;
    products: any[];
    start_date: string;
    terms: string;
    title: string;
}
export interface PromotionLoadMatch {
    id: number;
}
export interface PromotionListMatch {
    country_iso_code?: string;
    operator_id?: number;
    page?: number;
    per_page?: number;
    product_id?: number;
}
export interface Service {
    id: number;
    name: string;
    subservices: any[];
}
export interface ServiceLoadMatch {
    id: number;
}
export interface ServiceListMatch {
    country_iso_code?: string;
    page?: number;
    per_page?: number;
}
export interface Statement {
    account_number: string;
    account_qualifier?: string;
    page?: number;
    per_page?: number;
    product_id: number;
}
export interface StatementCreateData {
    account_number: string;
    account_qualifier?: string;
    page?: number;
    per_page?: number;
    product_id: number;
}
export interface Transaction {
    additional_identifier?: Record<string, any>;
    adjusted_values?: Record<string, any>;
    auto_confirm?: boolean;
    beneficiary?: Record<string, any>;
    benefits?: any[];
    calculation_mode?: any;
    callback_url?: string;
    confirmation_date?: string;
    confirmation_expiration_date?: string;
    creation_date?: string;
    credit_party_identifier?: Record<string, any>;
    debit_party_identifier?: Record<string, any>;
    destination: Record<string, any>;
    external_id: string;
    id?: string;
    metadata?: Record<string, any>;
    operator_reference?: string;
    pin: Record<string, any>;
    prices: Record<string, any>;
    product?: any;
    product_id: string;
    promotions?: any[];
    rates?: any;
    requested_values?: Record<string, any>;
    sender?: Record<string, any>;
    source: Record<string, any>;
    statement_identifier?: Record<string, any>;
    status?: Record<string, any>;
}
export interface TransactionLoadMatch {
    id: number;
}
export interface TransactionListMatch {
    country_iso_code?: string;
    credit_party_account_number?: string;
    credit_party_mobile_number?: string;
    external_id?: string;
    from_date?: string;
    operator_id?: number;
    page?: number;
    per_page?: number;
    product_type?: string;
    service_id?: number;
    status_id?: number;
    subservice_id?: number;
    to_date?: string;
}
export interface TransactionCreateData {
    additional_identifier?: Record<string, any>;
    adjusted_values?: Record<string, any>;
    auto_confirm?: boolean;
    beneficiary?: Record<string, any>;
    benefits?: any[];
    calculation_mode?: any;
    callback_url?: string;
    confirmation_date?: string;
    confirmation_expiration_date?: string;
    creation_date?: string;
    credit_party_identifier?: Record<string, any>;
    debit_party_identifier?: Record<string, any>;
    destination: Record<string, any>;
    external_id: string;
    id?: string;
    metadata?: Record<string, any>;
    operator_reference?: string;
    pin: Record<string, any>;
    prices: Record<string, any>;
    product?: any;
    product_id: string;
    promotions?: any[];
    rates?: any;
    requested_values?: Record<string, any>;
    sender?: Record<string, any>;
    source: Record<string, any>;
    statement_identifier?: Record<string, any>;
    status?: Record<string, any>;
    $action?: string;
    [action: string]: any;
}
