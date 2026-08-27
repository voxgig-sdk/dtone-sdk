-- Typed models for the Dtone SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
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
---@field campaign_id number

---@class CampaignListMatch
---@field country_iso_code? string
---@field operator_id? number
---@field page? number
---@field per_page? number
---@field product_id? number

---@class Country
---@field iso_code string
---@field name string
---@field regions table

---@class CountryLoadMatch
---@field country_iso_code string

---@class CountryListMatch
---@field page? number
---@field per_page? number
---@field service_id? number
---@field subservice_id? number

---@class CreditPartyBenefit
---@field amount number
---@field country table
---@field credit_party_identifier table
---@field expiration_date string
---@field page? number
---@field per_page? number
---@field service_id number
---@field type string
---@field unit string
---@field unit_type string

---@class CreditPartyBenefitListMatch
---@field amount? number
---@field country? table
---@field credit_party_identifier? table
---@field expiration_date? string
---@field page? number
---@field per_page? number
---@field service_id? number
---@field type? string
---@field unit? string
---@field unit_type? string

---@class CreditPartyStatus
---@field activation_date string
---@field credit_party_identifier table
---@field installation_date string
---@field service_id number

---@class CreditPartyStatusLoadMatch
---@field activation_date? string
---@field credit_party_identifier? table
---@field installation_date? string
---@field service_id? number

---@class MobileNumberLookup
---@field country table
---@field id number
---@field identified boolean
---@field mobile_number string
---@field name string
---@field page? number
---@field per_page? number
---@field regions table

---@class MobileNumberLookupListMatch
---@field mobile_number string
---@field page? number
---@field per_page? number

---@class Operator
---@field country table
---@field id number
---@field name string
---@field regions table

---@class OperatorLoadMatch
---@field operator_id number

---@class OperatorListMatch
---@field country_iso_code? string
---@field page? number
---@field per_page? number
---@field service_id? number
---@field subservice_id? number

---@class Product

---@class ProductLoadMatch
---@field product_id number

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
---@field promotion_id number

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
---@field service_id number

---@class ServiceListMatch
---@field country_iso_code? string
---@field page? number
---@field per_page? number

---@class StatementInquiry
---@field account_number string
---@field account_qualifier? string
---@field balance table
---@field dates table
---@field page? number
---@field per_page? number
---@field product_id number
---@field reference any

---@class StatementInquiryListMatch
---@field account_number? string
---@field account_qualifier? string
---@field balance? table
---@field dates? table
---@field page? number
---@field per_page? number
---@field product_id? number
---@field reference? any

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
---@field transaction_id number

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

---@class TransactionUpdateData
---@field transaction_id number
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
---@field destination? table
---@field external_id? string
---@field id? string
---@field metadata? table
---@field operator_reference? string
---@field pin? table
---@field prices? table
---@field product? any
---@field product_id? string
---@field promotions? table
---@field rates? any
---@field requested_values? table
---@field sender? table
---@field source? table
---@field statement_identifier? table
---@field status? table

local M = {}

return M
