# Typed models for the Dtone SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
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
    id: int


class CampaignListMatch(TypedDict, total=False):
    country_iso_code: str
    operator_id: int
    page: int
    per_page: int
    product_id: int


class CountryRequired(TypedDict):
    iso_code: str
    name: str
    regions: list


class Country(CountryRequired, total=False):
    id: str


class CountryLoadMatch(TypedDict):
    id: str


class CountryListMatch(TypedDict, total=False):
    page: int
    per_page: int
    service_id: int
    subservice_id: int


class CreditPartyBenefitRequired(TypedDict):
    credit_party_identifier: dict
    service_id: int


class CreditPartyBenefit(CreditPartyBenefitRequired, total=False):
    page: int
    per_page: int


class CreditPartyBenefitCreateDataRequired(TypedDict):
    credit_party_identifier: dict
    service_id: int


class CreditPartyBenefitCreateData(CreditPartyBenefitCreateDataRequired, total=False):
    page: int
    per_page: int


class CreditPartyStatus(TypedDict):
    activation_date: str
    credit_party_identifier: dict
    installation_date: str
    service_id: int


class CreditPartyStatusCreateData(TypedDict):
    activation_date: str
    credit_party_identifier: dict
    installation_date: str
    service_id: int


class MobileNumberRequired(TypedDict):
    mobile_number: str


class MobileNumber(MobileNumberRequired, total=False):
    id: str
    page: int
    per_page: int


class MobileNumberLoadMatchRequired(TypedDict):
    id: str


class MobileNumberLoadMatch(MobileNumberLoadMatchRequired, total=False):
    page: int
    per_page: int


class MobileNumberCreateDataRequired(TypedDict):
    mobile_number: str


class MobileNumberCreateData(MobileNumberCreateDataRequired, total=False):
    id: str
    page: int
    per_page: int


class Operator(TypedDict):
    country: dict
    id: int
    name: str
    regions: list


class OperatorLoadMatch(TypedDict):
    id: int


class OperatorListMatch(TypedDict, total=False):
    country_iso_code: str
    page: int
    per_page: int
    service_id: int
    subservice_id: int


class Product(TypedDict, total=False):
    id: str


class ProductLoadMatch(TypedDict):
    id: int


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
    id: int


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
    id: int


class ServiceListMatch(TypedDict, total=False):
    country_iso_code: str
    page: int
    per_page: int


class StatementRequired(TypedDict):
    account_number: str
    product_id: int


class Statement(StatementRequired, total=False):
    account_qualifier: str
    page: int
    per_page: int


class StatementCreateDataRequired(TypedDict):
    account_number: str
    product_id: int


class StatementCreateData(StatementCreateDataRequired, total=False):
    account_qualifier: str
    page: int
    per_page: int


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
    id: int


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
