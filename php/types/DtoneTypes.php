<?php
declare(strict_types=1);

// Typed models for the Dtone SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Balance entity data model. */
class Balance
{
    public float $available;
    public float $credit_limit;
    public float $holding;
    public int $id;
    public string $unit;
    public string $unit_type;
}

/** Request payload for Balance#list. */
class BalanceListMatch
{
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $unit = null;
    public ?string $unit_type = null;
}

/** BenefitType entity data model. */
class BenefitType
{
    public string $name;
}

/** Request payload for BenefitType#list. */
class BenefitTypeListMatch
{
    public ?int $page = null;
    public ?int $per_page = null;
}

/** Campaign entity data model. */
class Campaign
{
    public string $description;
    public string $end_date;
    public int $id;
    public array $products;
    public string $start_date;
    public string $terms;
    public string $title;
}

/** Request payload for Campaign#load. */
class CampaignLoadMatch
{
    public int $campaign_id;
}

/** Request payload for Campaign#list. */
class CampaignListMatch
{
    public ?string $country_iso_code = null;
    public ?int $operator_id = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?int $product_id = null;
}

/** Country entity data model. */
class Country
{
    public string $iso_code;
    public string $name;
    public array $regions;
}

/** Request payload for Country#load. */
class CountryLoadMatch
{
    public string $country_iso_code;
}

/** Request payload for Country#list. */
class CountryListMatch
{
    public ?int $page = null;
    public ?int $per_page = null;
    public ?int $service_id = null;
    public ?int $subservice_id = null;
}

/** CreditPartyBenefit entity data model. */
class CreditPartyBenefit
{
    public float $amount;
    public array $country;
    public array $credit_party_identifier;
    public string $expiration_date;
    public ?int $page = null;
    public ?int $per_page = null;
    public int $service_id;
    public string $type;
    public string $unit;
    public string $unit_type;
}

/** Request payload for CreditPartyBenefit#list. */
class CreditPartyBenefitListMatch
{
    public ?float $amount = null;
    public ?array $country = null;
    public ?array $credit_party_identifier = null;
    public ?string $expiration_date = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?int $service_id = null;
    public ?string $type = null;
    public ?string $unit = null;
    public ?string $unit_type = null;
}

/** CreditPartyStatus entity data model. */
class CreditPartyStatus
{
    public string $activation_date;
    public array $credit_party_identifier;
    public string $installation_date;
    public int $service_id;
}

/** Request payload for CreditPartyStatus#load. */
class CreditPartyStatusLoadMatch
{
    public ?string $activation_date = null;
    public ?array $credit_party_identifier = null;
    public ?string $installation_date = null;
    public ?int $service_id = null;
}

/** MobileNumberLookup entity data model. */
class MobileNumberLookup
{
    public array $country;
    public int $id;
    public bool $identified;
    public string $mobile_number;
    public string $name;
    public ?int $page = null;
    public ?int $per_page = null;
    public array $regions;
}

/** Request payload for MobileNumberLookup#list. */
class MobileNumberLookupListMatch
{
    public string $mobile_number;
    public ?int $page = null;
    public ?int $per_page = null;
}

/** Operator entity data model. */
class Operator
{
    public array $country;
    public int $id;
    public string $name;
    public array $regions;
}

/** Request payload for Operator#load. */
class OperatorLoadMatch
{
    public int $operator_id;
}

/** Request payload for Operator#list. */
class OperatorListMatch
{
    public ?string $country_iso_code = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?int $service_id = null;
    public ?int $subservice_id = null;
}

/** Product entity data model. */
class Product
{
}

/** Request payload for Product#load. */
class ProductLoadMatch
{
    public int $product_id;
}

/** Request payload for Product#list. */
class ProductListMatch
{
    public ?array $benefit_type = null;
    public ?string $country_iso_code = null;
    public ?int $operator_id = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $region = null;
    public ?int $service_id = null;
    public ?string $sort = null;
    public ?int $subservice_id = null;
    public ?array $tag = null;
    public ?string $type = null;
}

/** Promotion entity data model. */
class Promotion
{
    public string $description;
    public string $end_date;
    public int $id;
    public array $operator;
    public array $products;
    public string $start_date;
    public string $terms;
    public string $title;
}

/** Request payload for Promotion#load. */
class PromotionLoadMatch
{
    public int $promotion_id;
}

/** Request payload for Promotion#list. */
class PromotionListMatch
{
    public ?string $country_iso_code = null;
    public ?int $operator_id = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?int $product_id = null;
}

/** Service entity data model. */
class Service
{
    public int $id;
    public string $name;
    public array $subservices;
}

/** Request payload for Service#load. */
class ServiceLoadMatch
{
    public int $service_id;
}

/** Request payload for Service#list. */
class ServiceListMatch
{
    public ?string $country_iso_code = null;
    public ?int $page = null;
    public ?int $per_page = null;
}

/** StatementInquiry entity data model. */
class StatementInquiry
{
    public string $account_number;
    public ?string $account_qualifier = null;
    public array $balance;
    public array $dates;
    public ?int $page = null;
    public ?int $per_page = null;
    public int $product_id;
    public mixed $reference;
}

/** Request payload for StatementInquiry#list. */
class StatementInquiryListMatch
{
    public ?string $account_number = null;
    public ?string $account_qualifier = null;
    public ?array $balance = null;
    public ?array $dates = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?int $product_id = null;
    public mixed $reference = null;
}

/** Transaction entity data model. */
class Transaction
{
    public ?array $additional_identifier = null;
    public ?array $adjusted_values = null;
    public ?bool $auto_confirm = null;
    public ?array $beneficiary = null;
    public ?array $benefits = null;
    public mixed $calculation_mode = null;
    public ?string $callback_url = null;
    public ?string $confirmation_date = null;
    public ?string $confirmation_expiration_date = null;
    public ?string $creation_date = null;
    public ?array $credit_party_identifier = null;
    public ?array $debit_party_identifier = null;
    public array $destination;
    public string $external_id;
    public ?string $id = null;
    public ?array $metadata = null;
    public ?string $operator_reference = null;
    public array $pin;
    public array $prices;
    public mixed $product = null;
    public string $product_id;
    public ?array $promotions = null;
    public mixed $rates = null;
    public ?array $requested_values = null;
    public ?array $sender = null;
    public array $source;
    public ?array $statement_identifier = null;
    public ?array $status = null;
}

/** Request payload for Transaction#load. */
class TransactionLoadMatch
{
    public int $transaction_id;
}

/** Request payload for Transaction#list. */
class TransactionListMatch
{
    public ?string $country_iso_code = null;
    public ?string $credit_party_account_number = null;
    public ?string $credit_party_mobile_number = null;
    public ?string $external_id = null;
    public ?string $from_date = null;
    public ?int $operator_id = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $product_type = null;
    public ?int $service_id = null;
    public ?int $status_id = null;
    public ?int $subservice_id = null;
    public ?string $to_date = null;
}

/** Request payload for Transaction#create. */
class TransactionCreateData
{
    public ?array $additional_identifier = null;
    public ?array $adjusted_values = null;
    public ?bool $auto_confirm = null;
    public ?array $beneficiary = null;
    public ?array $benefits = null;
    public mixed $calculation_mode = null;
    public ?string $callback_url = null;
    public ?string $confirmation_date = null;
    public ?string $confirmation_expiration_date = null;
    public ?string $creation_date = null;
    public ?array $credit_party_identifier = null;
    public ?array $debit_party_identifier = null;
    public array $destination;
    public string $external_id;
    public ?string $id = null;
    public ?array $metadata = null;
    public ?string $operator_reference = null;
    public array $pin;
    public array $prices;
    public mixed $product = null;
    public string $product_id;
    public ?array $promotions = null;
    public mixed $rates = null;
    public ?array $requested_values = null;
    public ?array $sender = null;
    public array $source;
    public ?array $statement_identifier = null;
    public ?array $status = null;
}

/** Request payload for Transaction#update. */
class TransactionUpdateData
{
    public int $transaction_id;
    public ?array $additional_identifier = null;
    public ?array $adjusted_values = null;
    public ?bool $auto_confirm = null;
    public ?array $beneficiary = null;
    public ?array $benefits = null;
    public mixed $calculation_mode = null;
    public ?string $callback_url = null;
    public ?string $confirmation_date = null;
    public ?string $confirmation_expiration_date = null;
    public ?string $creation_date = null;
    public ?array $credit_party_identifier = null;
    public ?array $debit_party_identifier = null;
    public ?array $destination = null;
    public ?string $external_id = null;
    public ?string $id = null;
    public ?array $metadata = null;
    public ?string $operator_reference = null;
    public ?array $pin = null;
    public ?array $prices = null;
    public mixed $product = null;
    public ?string $product_id = null;
    public ?array $promotions = null;
    public mixed $rates = null;
    public ?array $requested_values = null;
    public ?array $sender = null;
    public ?array $source = null;
    public ?array $statement_identifier = null;
    public ?array $status = null;
}

