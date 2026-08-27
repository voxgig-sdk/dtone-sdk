// Typed models for the Dtone SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Balance
 * @property {number} available
 * @property {number} credit_limit
 * @property {number} holding
 * @property {number} id
 * @property {string} unit
 * @property {string} unit_type
 */

/**
 * @typedef {Object} BalanceListMatch
 * @property {number} [page]
 * @property {number} [per_page]
 * @property {string} [unit]
 * @property {string} [unit_type]
 */

/**
 * @typedef {Object} BenefitType
 * @property {string} name
 */

/**
 * @typedef {Object} BenefitTypeListMatch
 * @property {number} [page]
 * @property {number} [per_page]
 */

/**
 * @typedef {Object} Campaign
 * @property {string} description
 * @property {string} end_date
 * @property {number} id
 * @property {Array} products
 * @property {string} start_date
 * @property {string} terms
 * @property {string} title
 */

/**
 * @typedef {Object} CampaignLoadMatch
 * @property {number} campaign_id
 */

/**
 * @typedef {Object} CampaignListMatch
 * @property {string} [country_iso_code]
 * @property {number} [operator_id]
 * @property {number} [page]
 * @property {number} [per_page]
 * @property {number} [product_id]
 */

/**
 * @typedef {Object} Country
 * @property {string} iso_code
 * @property {string} name
 * @property {Array} regions
 */

/**
 * @typedef {Object} CountryLoadMatch
 * @property {string} country_iso_code
 */

/**
 * @typedef {Object} CountryListMatch
 * @property {number} [page]
 * @property {number} [per_page]
 * @property {number} [service_id]
 * @property {number} [subservice_id]
 */

/**
 * @typedef {Object} CreditPartyBenefit
 * @property {number} amount
 * @property {Object} country
 * @property {Object} credit_party_identifier
 * @property {string} expiration_date
 * @property {number} [page]
 * @property {number} [per_page]
 * @property {number} service_id
 * @property {string} type
 * @property {string} unit
 * @property {string} unit_type
 */

/**
 * @typedef {Object} CreditPartyBenefitListMatch
 * @property {number} [amount]
 * @property {Object} [country]
 * @property {Object} [credit_party_identifier]
 * @property {string} [expiration_date]
 * @property {number} [page]
 * @property {number} [per_page]
 * @property {number} [service_id]
 * @property {string} [type]
 * @property {string} [unit]
 * @property {string} [unit_type]
 */

/**
 * @typedef {Object} CreditPartyStatus
 * @property {string} activation_date
 * @property {Object} credit_party_identifier
 * @property {string} installation_date
 * @property {number} service_id
 */

/**
 * @typedef {Object} CreditPartyStatusLoadMatch
 * @property {string} [activation_date]
 * @property {Object} [credit_party_identifier]
 * @property {string} [installation_date]
 * @property {number} [service_id]
 */

/**
 * @typedef {Object} MobileNumberLookup
 * @property {Object} country
 * @property {number} id
 * @property {boolean} identified
 * @property {string} mobile_number
 * @property {string} name
 * @property {number} [page]
 * @property {number} [per_page]
 * @property {Array} regions
 */

/**
 * @typedef {Object} MobileNumberLookupListMatch
 * @property {string} mobile_number
 * @property {number} [page]
 * @property {number} [per_page]
 */

/**
 * @typedef {Object} Operator
 * @property {Object} country
 * @property {number} id
 * @property {string} name
 * @property {Array} regions
 */

/**
 * @typedef {Object} OperatorLoadMatch
 * @property {number} operator_id
 */

/**
 * @typedef {Object} OperatorListMatch
 * @property {string} [country_iso_code]
 * @property {number} [page]
 * @property {number} [per_page]
 * @property {number} [service_id]
 * @property {number} [subservice_id]
 */

/**
 * @typedef {Object} Product
 */

/**
 * @typedef {Object} ProductLoadMatch
 * @property {number} product_id
 */

/**
 * @typedef {Object} ProductListMatch
 * @property {Array} [benefit_type]
 * @property {string} [country_iso_code]
 * @property {number} [operator_id]
 * @property {number} [page]
 * @property {number} [per_page]
 * @property {string} [region]
 * @property {number} [service_id]
 * @property {string} [sort]
 * @property {number} [subservice_id]
 * @property {Array} [tag]
 * @property {string} [type]
 */

/**
 * @typedef {Object} Promotion
 * @property {string} description
 * @property {string} end_date
 * @property {number} id
 * @property {Object} operator
 * @property {Array} products
 * @property {string} start_date
 * @property {string} terms
 * @property {string} title
 */

/**
 * @typedef {Object} PromotionLoadMatch
 * @property {number} promotion_id
 */

/**
 * @typedef {Object} PromotionListMatch
 * @property {string} [country_iso_code]
 * @property {number} [operator_id]
 * @property {number} [page]
 * @property {number} [per_page]
 * @property {number} [product_id]
 */

/**
 * @typedef {Object} Service
 * @property {number} id
 * @property {string} name
 * @property {Array} subservices
 */

/**
 * @typedef {Object} ServiceLoadMatch
 * @property {number} service_id
 */

/**
 * @typedef {Object} ServiceListMatch
 * @property {string} [country_iso_code]
 * @property {number} [page]
 * @property {number} [per_page]
 */

/**
 * @typedef {Object} StatementInquiry
 * @property {string} account_number
 * @property {string} [account_qualifier]
 * @property {Object} balance
 * @property {Object} dates
 * @property {number} [page]
 * @property {number} [per_page]
 * @property {number} product_id
 * @property {*} reference
 */

/**
 * @typedef {Object} StatementInquiryListMatch
 * @property {string} [account_number]
 * @property {string} [account_qualifier]
 * @property {Object} [balance]
 * @property {Object} [dates]
 * @property {number} [page]
 * @property {number} [per_page]
 * @property {number} [product_id]
 * @property {*} [reference]
 */

/**
 * @typedef {Object} Transaction
 * @property {Object} [additional_identifier]
 * @property {Object} [adjusted_values]
 * @property {boolean} [auto_confirm]
 * @property {Object} [beneficiary]
 * @property {Array} [benefits]
 * @property {*} [calculation_mode]
 * @property {string} [callback_url]
 * @property {string} [confirmation_date]
 * @property {string} [confirmation_expiration_date]
 * @property {string} [creation_date]
 * @property {Object} [credit_party_identifier]
 * @property {Object} [debit_party_identifier]
 * @property {Object} destination
 * @property {string} external_id
 * @property {string} [id]
 * @property {Object} [metadata]
 * @property {string} [operator_reference]
 * @property {Object} pin
 * @property {Object} prices
 * @property {*} [product]
 * @property {string} product_id
 * @property {Array} [promotions]
 * @property {*} [rates]
 * @property {Object} [requested_values]
 * @property {Object} [sender]
 * @property {Object} source
 * @property {Object} [statement_identifier]
 * @property {Object} [status]
 */

/**
 * @typedef {Object} TransactionLoadMatch
 * @property {number} transaction_id
 */

/**
 * @typedef {Object} TransactionListMatch
 * @property {string} [country_iso_code]
 * @property {string} [credit_party_account_number]
 * @property {string} [credit_party_mobile_number]
 * @property {string} [external_id]
 * @property {string} [from_date]
 * @property {number} [operator_id]
 * @property {number} [page]
 * @property {number} [per_page]
 * @property {string} [product_type]
 * @property {number} [service_id]
 * @property {number} [status_id]
 * @property {number} [subservice_id]
 * @property {string} [to_date]
 */

/**
 * @typedef {Object} TransactionCreateData
 * @property {Object} [additional_identifier]
 * @property {Object} [adjusted_values]
 * @property {boolean} [auto_confirm]
 * @property {Object} [beneficiary]
 * @property {Array} [benefits]
 * @property {*} [calculation_mode]
 * @property {string} [callback_url]
 * @property {string} [confirmation_date]
 * @property {string} [confirmation_expiration_date]
 * @property {string} [creation_date]
 * @property {Object} [credit_party_identifier]
 * @property {Object} [debit_party_identifier]
 * @property {Object} destination
 * @property {string} external_id
 * @property {string} [id]
 * @property {Object} [metadata]
 * @property {string} [operator_reference]
 * @property {Object} pin
 * @property {Object} prices
 * @property {*} [product]
 * @property {string} product_id
 * @property {Array} [promotions]
 * @property {*} [rates]
 * @property {Object} [requested_values]
 * @property {Object} [sender]
 * @property {Object} source
 * @property {Object} [statement_identifier]
 * @property {Object} [status]
 */

/**
 * @typedef {Object} TransactionUpdateData
 * @property {number} transaction_id
 * @property {Object} [additional_identifier]
 * @property {Object} [adjusted_values]
 * @property {boolean} [auto_confirm]
 * @property {Object} [beneficiary]
 * @property {Array} [benefits]
 * @property {*} [calculation_mode]
 * @property {string} [callback_url]
 * @property {string} [confirmation_date]
 * @property {string} [confirmation_expiration_date]
 * @property {string} [creation_date]
 * @property {Object} [credit_party_identifier]
 * @property {Object} [debit_party_identifier]
 * @property {Object} [destination]
 * @property {string} [external_id]
 * @property {string} [id]
 * @property {Object} [metadata]
 * @property {string} [operator_reference]
 * @property {Object} [pin]
 * @property {Object} [prices]
 * @property {*} [product]
 * @property {string} [product_id]
 * @property {Array} [promotions]
 * @property {*} [rates]
 * @property {Object} [requested_values]
 * @property {Object} [sender]
 * @property {Object} [source]
 * @property {Object} [statement_identifier]
 * @property {Object} [status]
 */

