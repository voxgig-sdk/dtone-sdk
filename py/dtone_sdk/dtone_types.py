# Typed models for the Dtone SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Balance(TypedDict):
    available: float
    credit_limit: float
    holding: float
    id: int
    unit: str
    unit_type: str


class BalanceListMatch(TypedDict, total=False):
    page: int
    per_page: int
    unit: str
    unit_type: str


class BenefitType(TypedDict):
    name: str


class BenefitTypeListMatch(TypedDict, total=False):
    page: int
    per_page: int


class Campaign(TypedDict):
    description: str
    end_date: str
    id: int
    products: list
    start_date: str
    terms: str
    title: str


class CampaignLoadMatch(TypedDict):
    campaign_id: int


class CampaignListMatch(TypedDict, total=False):
    country_iso_code: str
    operator_id: int
    page: int
    per_page: int
    product_id: int


class Country(TypedDict):
    iso_code: str
    name: str
    regions: list


class CountryLoadMatch(TypedDict):
    country_iso_code: str


class CountryListMatch(TypedDict, total=False):
    page: int
    per_page: int
    service_id: int
    subservice_id: int


class CreditPartyBenefitRequired(TypedDict):
    amount: float
    country: dict
    credit_party_identifier: dict
    expiration_date: str
    service_id: int
    type: str
    unit: str
    unit_type: str


class CreditPartyBenefit(CreditPartyBenefitRequired, total=False):
    page: int
    per_page: int


class CreditPartyBenefitListMatch(TypedDict, total=False):
    amount: float
    country: dict
    credit_party_identifier: dict
    expiration_date: str
    page: int
    per_page: int
    service_id: int
    type: str
    unit: str
    unit_type: str


class CreditPartyStatus(TypedDict):
    activation_date: str
    credit_party_identifier: dict
    installation_date: str
    service_id: int


class CreditPartyStatusLoadMatch(TypedDict, total=False):
    activation_date: str
    credit_party_identifier: dict
    installation_date: str
    service_id: int


class MobileNumberLookupRequired(TypedDict):
    country: dict
    id: int
    identified: bool
    mobile_number: str
    name: str
    regions: list


class MobileNumberLookup(MobileNumberLookupRequired, total=False):
    page: int
    per_page: int


class MobileNumberLookupListMatchRequired(TypedDict):
    mobile_number: str


class MobileNumberLookupListMatch(MobileNumberLookupListMatchRequired, total=False):
    page: int
    per_page: int


class Operator(TypedDict):
    country: dict
    id: int
    name: str
    regions: list


class OperatorLoadMatch(TypedDict):
    operator_id: int


class OperatorListMatch(TypedDict, total=False):
    country_iso_code: str
    page: int
    per_page: int
    service_id: int
    subservice_id: int


class Product(TypedDict):
    pass


class ProductLoadMatch(TypedDict):
    product_id: int


class ProductListMatch(TypedDict, total=False):
    benefit_type: list
    country_iso_code: str
    operator_id: int
    page: int
    per_page: int
    region: str
    service_id: int
    sort: str
    subservice_id: int
    tag: list
    type: str


class Promotion(TypedDict):
    description: str
    end_date: str
    id: int
    operator: dict
    products: list
    start_date: str
    terms: str
    title: str


class PromotionLoadMatch(TypedDict):
    promotion_id: int


class PromotionListMatch(TypedDict, total=False):
    country_iso_code: str
    operator_id: int
    page: int
    per_page: int
    product_id: int


class Service(TypedDict):
    id: int
    name: str
    subservices: list


class ServiceLoadMatch(TypedDict):
    service_id: int


class ServiceListMatch(TypedDict, total=False):
    country_iso_code: str
    page: int
    per_page: int


class StatementInquiryRequired(TypedDict):
    account_number: str
    balance: dict
    dates: dict
    product_id: int
    reference: Any


class StatementInquiry(StatementInquiryRequired, total=False):
    account_qualifier: str
    page: int
    per_page: int


class StatementInquiryListMatch(TypedDict, total=False):
    account_number: str
    account_qualifier: str
    balance: dict
    dates: dict
    page: int
    per_page: int
    product_id: int
    reference: Any


class TransactionRequired(TypedDict):
    destination: dict
    external_id: str
    pin: dict
    prices: dict
    product_id: str
    source: dict


class Transaction(TransactionRequired, total=False):
    additional_identifier: dict
    adjusted_values: dict
    auto_confirm: bool
    beneficiary: dict
    benefits: list
    calculation_mode: Any
    callback_url: str
    confirmation_date: str
    confirmation_expiration_date: str
    creation_date: str
    credit_party_identifier: dict
    debit_party_identifier: dict
    id: str
    metadata: dict
    operator_reference: str
    product: Any
    promotions: list
    rates: Any
    requested_values: dict
    sender: dict
    statement_identifier: dict
    status: dict


class TransactionLoadMatch(TypedDict):
    transaction_id: int


class TransactionListMatch(TypedDict, total=False):
    country_iso_code: str
    credit_party_account_number: str
    credit_party_mobile_number: str
    external_id: str
    from_date: str
    operator_id: int
    page: int
    per_page: int
    product_type: str
    service_id: int
    status_id: int
    subservice_id: int
    to_date: str


class TransactionCreateDataRequired(TypedDict):
    destination: dict
    external_id: str
    pin: dict
    prices: dict
    product_id: str
    source: dict


class TransactionCreateData(TransactionCreateDataRequired, total=False):
    additional_identifier: dict
    adjusted_values: dict
    auto_confirm: bool
    beneficiary: dict
    benefits: list
    calculation_mode: Any
    callback_url: str
    confirmation_date: str
    confirmation_expiration_date: str
    creation_date: str
    credit_party_identifier: dict
    debit_party_identifier: dict
    id: str
    metadata: dict
    operator_reference: str
    product: Any
    promotions: list
    rates: Any
    requested_values: dict
    sender: dict
    statement_identifier: dict
    status: dict


class TransactionUpdateDataRequired(TypedDict):
    transaction_id: int


class TransactionUpdateData(TransactionUpdateDataRequired, total=False):
    additional_identifier: dict
    adjusted_values: dict
    auto_confirm: bool
    beneficiary: dict
    benefits: list
    calculation_mode: Any
    callback_url: str
    confirmation_date: str
    confirmation_expiration_date: str
    creation_date: str
    credit_party_identifier: dict
    debit_party_identifier: dict
    destination: dict
    external_id: str
    id: str
    metadata: dict
    operator_reference: str
    pin: dict
    prices: dict
    product: Any
    product_id: str
    promotions: list
    rates: Any
    requested_values: dict
    sender: dict
    source: dict
    statement_identifier: dict
    status: dict
