-- Typed models for the Dtone SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Balance
---@field available number
---@field credit_limit number
---@field holding number
---@field id number
---@field unit string
---@field unit_type string

---@class BalanceListMatch
---@field page? number
---@field per_page? number
---@field unit? string
---@field unit_type? string

---@class BenefitType
---@field name string

---@class BenefitTypeListMatch
---@field page? number
---@field per_page? number

---@class Campaign
---@field description string
---@field end_date string
---@field id number
---@field products table
---@field start_date string
---@field terms string
---@field title string

---@class CampaignLoadMatch
---@field id number

---@class CampaignListMatch
---@field country_iso_code? string
---@field operator_id? number
---@field page? number
---@field per_page? number
---@field product_id? number

---@class Country
---@field id? string
---@field iso_code string
---@field name string
---@field regions table

---@class CountryLoadMatch
---@field id string

---@class CountryListMatch
---@field page? number
---@field per_page? number
---@field service_id? number
---@field subservice_id? number

---@class CreditPartyBenefit
---@field credit_party_identifier table
---@field page? number
---@field per_page? number
---@field service_id number

---@class CreditPartyBenefitCreateData
---@field credit_party_identifier table
---@field page? number
---@field per_page? number
---@field service_id number

---@class CreditPartyStatus
---@field activation_date string
---@field credit_party_identifier table
---@field installation_date string
---@field service_id number

---@class CreditPartyStatusCreateData
---@field activation_date string
---@field credit_party_identifier table
---@field installation_date string
---@field service_id number

---@class MobileNumber
---@field id? string
---@field mobile_number string
---@field page? number
---@field per_page? number

---@class MobileNumberLoadMatch
---@field id string
---@field page? number
---@field per_page? number

---@class MobileNumberCreateData
---@field id? string
---@field mobile_number string
---@field page? number
---@field per_page? number

---@class Operator
---@field country table
---@field id number
---@field name string
---@field regions table

---@class OperatorLoadMatch
---@field id number

---@class OperatorListMatch
---@field country_iso_code? string
---@field page? number
---@field per_page? number
---@field service_id? number
---@field subservice_id? number

---@class Product
---@field id? string

---@class ProductLoadMatch
---@field id number

---@class ProductListMatch
---@field benefit_type? table
---@field country_iso_code? string
---@field operator_id? number
---@field page? number
---@field per_page? number
---@field region? string
---@field service_id? number
---@field sort? string
---@field subservice_id? number
---@field tag? table
---@field type? string

---@class Promotion
---@field description string
---@field end_date string
---@field id number
---@field operator table
---@field products table
---@field start_date string
---@field terms string
---@field title string

---@class PromotionLoadMatch
---@field id number

---@class PromotionListMatch
---@field country_iso_code? string
---@field operator_id? number
---@field page? number
---@field per_page? number
---@field product_id? number

---@class Service
---@field id number
---@field name string
---@field subservices table

---@class ServiceLoadMatch
---@field id number

---@class ServiceListMatch
---@field country_iso_code? string
---@field page? number
---@field per_page? number

---@class Statement
---@field account_number string
---@field account_qualifier? string
---@field page? number
---@field per_page? number
---@field product_id number

---@class StatementCreateData
---@field account_number string
---@field account_qualifier? string
---@field page? number
---@field per_page? number
---@field product_id number

---@class Transaction
---@field additional_identifier? table
---@field adjusted_values? table
---@field auto_confirm? boolean
---@field beneficiary? table
---@field benefits? table
---@field calculation_mode? any
---@field callback_url? string
---@field confirmation_date? string
---@field confirmation_expiration_date? string
---@field creation_date? string
---@field credit_party_identifier? table
---@field debit_party_identifier? table
---@field destination table
---@field external_id string
---@field id? string
---@field metadata? table
---@field operator_reference? string
---@field pin table
---@field prices table
---@field product? any
---@field product_id string
---@field promotions? table
---@field rates? any
---@field requested_values? table
---@field sender? table
---@field source table
---@field statement_identifier? table
---@field status? table

---@class TransactionLoadMatch
---@field id number

---@class TransactionListMatch
---@field country_iso_code? string
---@field credit_party_account_number? string
---@field credit_party_mobile_number? string
---@field external_id? string
---@field from_date? string
---@field operator_id? number
---@field page? number
---@field per_page? number
---@field product_type? string
---@field service_id? number
---@field status_id? number
---@field subservice_id? number
---@field to_date? string

---@class TransactionCreateData
---@field additional_identifier? table
---@field adjusted_values? table
---@field auto_confirm? boolean
---@field beneficiary? table
---@field benefits? table
---@field calculation_mode? any
---@field callback_url? string
---@field confirmation_date? string
---@field confirmation_expiration_date? string
---@field creation_date? string
---@field credit_party_identifier? table
---@field debit_party_identifier? table
---@field destination table
---@field external_id string
---@field id? string
---@field metadata? table
---@field operator_reference? string
---@field pin table
---@field prices table
---@field product? any
---@field product_id string
---@field promotions? table
---@field rates? any
---@field requested_values? table
---@field sender? table
---@field source table
---@field statement_identifier? table
---@field status? table

local M = {}

return M
