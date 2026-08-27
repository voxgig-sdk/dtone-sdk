// Typed models for the Dtone SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/dtone-sdk/go/core"
)

// Balance is the typed data model for the balance entity.
type Balance struct {
	Available float64 `json:"available"`
	CreditLimit float64 `json:"credit_limit"`
	Holding float64 `json:"holding"`
	Id int `json:"id"`
	Unit string `json:"unit"`
	UnitType string `json:"unit_type"`
}

// BalanceListMatch is the typed request payload for Balance.ListTyped.
type BalanceListMatch struct {
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	Unit *string `json:"unit,omitempty"`
	UnitType *string `json:"unit_type,omitempty"`
}

// BenefitType is the typed data model for the benefit_type entity.
type BenefitType struct {
	Name string `json:"name"`
}

// BenefitTypeListMatch is the typed request payload for BenefitType.ListTyped.
type BenefitTypeListMatch struct {
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
}

// Campaign is the typed data model for the campaign entity.
type Campaign struct {
	Description string `json:"description"`
	EndDate string `json:"end_date"`
	Id int `json:"id"`
	Products []any `json:"products"`
	StartDate string `json:"start_date"`
	Terms string `json:"terms"`
	Title string `json:"title"`
}

// CampaignLoadMatch is the typed request payload for Campaign.LoadTyped.
type CampaignLoadMatch struct {
	CampaignId int `json:"campaign_id"`
}

// CampaignListMatch is the typed request payload for Campaign.ListTyped.
type CampaignListMatch struct {
	CountryIsoCode *string `json:"country_iso_code,omitempty"`
	OperatorId *int `json:"operator_id,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	ProductId *int `json:"product_id,omitempty"`
}

// Country is the typed data model for the country entity.
type Country struct {
	IsoCode string `json:"iso_code"`
	Name string `json:"name"`
	Regions []any `json:"regions"`
}

// CountryLoadMatch is the typed request payload for Country.LoadTyped.
type CountryLoadMatch struct {
	CountryIsoCode string `json:"country_iso_code"`
}

// CountryListMatch is the typed request payload for Country.ListTyped.
type CountryListMatch struct {
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	ServiceId *int `json:"service_id,omitempty"`
	SubserviceId *int `json:"subservice_id,omitempty"`
}

// CreditPartyBenefit is the typed data model for the credit_party_benefit entity.
type CreditPartyBenefit struct {
	Amount float64 `json:"amount"`
	Country map[string]any `json:"country"`
	CreditPartyIdentifier map[string]any `json:"credit_party_identifier"`
	ExpirationDate string `json:"expiration_date"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	ServiceId int `json:"service_id"`
	Type string `json:"type"`
	Unit string `json:"unit"`
	UnitType string `json:"unit_type"`
}

// CreditPartyBenefitListMatch is the typed request payload for CreditPartyBenefit.ListTyped.
type CreditPartyBenefitListMatch struct {
	Amount *float64 `json:"amount,omitempty"`
	Country *map[string]any `json:"country,omitempty"`
	CreditPartyIdentifier *map[string]any `json:"credit_party_identifier,omitempty"`
	ExpirationDate *string `json:"expiration_date,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	ServiceId *int `json:"service_id,omitempty"`
	Type *string `json:"type,omitempty"`
	Unit *string `json:"unit,omitempty"`
	UnitType *string `json:"unit_type,omitempty"`
}

// CreditPartyStatus is the typed data model for the credit_party_status entity.
type CreditPartyStatus struct {
	ActivationDate string `json:"activation_date"`
	CreditPartyIdentifier map[string]any `json:"credit_party_identifier"`
	InstallationDate string `json:"installation_date"`
	ServiceId int `json:"service_id"`
}

// CreditPartyStatusLoadMatch is the typed request payload for CreditPartyStatus.LoadTyped.
type CreditPartyStatusLoadMatch struct {
	ActivationDate *string `json:"activation_date,omitempty"`
	CreditPartyIdentifier *map[string]any `json:"credit_party_identifier,omitempty"`
	InstallationDate *string `json:"installation_date,omitempty"`
	ServiceId *int `json:"service_id,omitempty"`
}

// MobileNumberLookup is the typed data model for the mobile_number_lookup entity.
type MobileNumberLookup struct {
	Country map[string]any `json:"country"`
	Id int `json:"id"`
	Identified bool `json:"identified"`
	MobileNumber string `json:"mobile_number"`
	Name string `json:"name"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	Regions []any `json:"regions"`
}

// MobileNumberLookupListMatch is the typed request payload for MobileNumberLookup.ListTyped.
type MobileNumberLookupListMatch struct {
	MobileNumber string `json:"mobile_number"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
}

// Operator is the typed data model for the operator entity.
type Operator struct {
	Country map[string]any `json:"country"`
	Id int `json:"id"`
	Name string `json:"name"`
	Regions []any `json:"regions"`
}

// OperatorLoadMatch is the typed request payload for Operator.LoadTyped.
type OperatorLoadMatch struct {
	OperatorId int `json:"operator_id"`
}

// OperatorListMatch is the typed request payload for Operator.ListTyped.
type OperatorListMatch struct {
	CountryIsoCode *string `json:"country_iso_code,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	ServiceId *int `json:"service_id,omitempty"`
	SubserviceId *int `json:"subservice_id,omitempty"`
}

// Product is the typed data model for the product entity.
type Product struct {
}

// ProductLoadMatch is the typed request payload for Product.LoadTyped.
type ProductLoadMatch struct {
	ProductId int `json:"product_id"`
}

// ProductListMatch is the typed request payload for Product.ListTyped.
type ProductListMatch struct {
	BenefitType *[]any `json:"benefit_type,omitempty"`
	CountryIsoCode *string `json:"country_iso_code,omitempty"`
	OperatorId *int `json:"operator_id,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	Region *string `json:"region,omitempty"`
	ServiceId *int `json:"service_id,omitempty"`
	Sort *string `json:"sort,omitempty"`
	SubserviceId *int `json:"subservice_id,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Promotion is the typed data model for the promotion entity.
type Promotion struct {
	Description string `json:"description"`
	EndDate string `json:"end_date"`
	Id int `json:"id"`
	Operator map[string]any `json:"operator"`
	Products []any `json:"products"`
	StartDate string `json:"start_date"`
	Terms string `json:"terms"`
	Title string `json:"title"`
}

// PromotionLoadMatch is the typed request payload for Promotion.LoadTyped.
type PromotionLoadMatch struct {
	PromotionId int `json:"promotion_id"`
}

// PromotionListMatch is the typed request payload for Promotion.ListTyped.
type PromotionListMatch struct {
	CountryIsoCode *string `json:"country_iso_code,omitempty"`
	OperatorId *int `json:"operator_id,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	ProductId *int `json:"product_id,omitempty"`
}

// Service is the typed data model for the service entity.
type Service struct {
	Id int `json:"id"`
	Name string `json:"name"`
	Subservices []any `json:"subservices"`
}

// ServiceLoadMatch is the typed request payload for Service.LoadTyped.
type ServiceLoadMatch struct {
	ServiceId int `json:"service_id"`
}

// ServiceListMatch is the typed request payload for Service.ListTyped.
type ServiceListMatch struct {
	CountryIsoCode *string `json:"country_iso_code,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
}

// StatementInquiry is the typed data model for the statement_inquiry entity.
type StatementInquiry struct {
	AccountNumber string `json:"account_number"`
	AccountQualifier *string `json:"account_qualifier,omitempty"`
	Balance map[string]any `json:"balance"`
	Dates map[string]any `json:"dates"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	ProductId int `json:"product_id"`
	Reference any `json:"reference"`
}

// StatementInquiryListMatch is the typed request payload for StatementInquiry.ListTyped.
type StatementInquiryListMatch struct {
	AccountNumber *string `json:"account_number,omitempty"`
	AccountQualifier *string `json:"account_qualifier,omitempty"`
	Balance *map[string]any `json:"balance,omitempty"`
	Dates *map[string]any `json:"dates,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	ProductId *int `json:"product_id,omitempty"`
	Reference *any `json:"reference,omitempty"`
}

// Transaction is the typed data model for the transaction entity.
type Transaction struct {
	AdditionalIdentifier *map[string]any `json:"additional_identifier,omitempty"`
	AdjustedValues *map[string]any `json:"adjusted_values,omitempty"`
	AutoConfirm *bool `json:"auto_confirm,omitempty"`
	Beneficiary *map[string]any `json:"beneficiary,omitempty"`
	Benefits *[]any `json:"benefits,omitempty"`
	CalculationMode *any `json:"calculation_mode,omitempty"`
	CallbackUrl *string `json:"callback_url,omitempty"`
	ConfirmationDate *string `json:"confirmation_date,omitempty"`
	ConfirmationExpirationDate *string `json:"confirmation_expiration_date,omitempty"`
	CreationDate *string `json:"creation_date,omitempty"`
	CreditPartyIdentifier *map[string]any `json:"credit_party_identifier,omitempty"`
	DebitPartyIdentifier *map[string]any `json:"debit_party_identifier,omitempty"`
	Destination map[string]any `json:"destination"`
	ExternalId string `json:"external_id"`
	Id *string `json:"id,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	OperatorReference *string `json:"operator_reference,omitempty"`
	Pin map[string]any `json:"pin"`
	Prices map[string]any `json:"prices"`
	Product *any `json:"product,omitempty"`
	ProductId string `json:"product_id"`
	Promotions *[]any `json:"promotions,omitempty"`
	Rates *any `json:"rates,omitempty"`
	RequestedValues *map[string]any `json:"requested_values,omitempty"`
	Sender *map[string]any `json:"sender,omitempty"`
	Source map[string]any `json:"source"`
	StatementIdentifier *map[string]any `json:"statement_identifier,omitempty"`
	Status *map[string]any `json:"status,omitempty"`
}

// TransactionLoadMatch is the typed request payload for Transaction.LoadTyped.
type TransactionLoadMatch struct {
	TransactionId int `json:"transaction_id"`
}

// TransactionListMatch is the typed request payload for Transaction.ListTyped.
type TransactionListMatch struct {
	CountryIsoCode *string `json:"country_iso_code,omitempty"`
	CreditPartyAccountNumber *string `json:"credit_party_account_number,omitempty"`
	CreditPartyMobileNumber *string `json:"credit_party_mobile_number,omitempty"`
	ExternalId *string `json:"external_id,omitempty"`
	FromDate *string `json:"from_date,omitempty"`
	OperatorId *int `json:"operator_id,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	ProductType *string `json:"product_type,omitempty"`
	ServiceId *int `json:"service_id,omitempty"`
	StatusId *int `json:"status_id,omitempty"`
	SubserviceId *int `json:"subservice_id,omitempty"`
	ToDate *string `json:"to_date,omitempty"`
}

// TransactionCreateData is the typed request payload for Transaction.CreateTyped.
type TransactionCreateData struct {
	AdditionalIdentifier *map[string]any `json:"additional_identifier,omitempty"`
	AdjustedValues *map[string]any `json:"adjusted_values,omitempty"`
	AutoConfirm *bool `json:"auto_confirm,omitempty"`
	Beneficiary *map[string]any `json:"beneficiary,omitempty"`
	Benefits *[]any `json:"benefits,omitempty"`
	CalculationMode *any `json:"calculation_mode,omitempty"`
	CallbackUrl *string `json:"callback_url,omitempty"`
	ConfirmationDate *string `json:"confirmation_date,omitempty"`
	ConfirmationExpirationDate *string `json:"confirmation_expiration_date,omitempty"`
	CreationDate *string `json:"creation_date,omitempty"`
	CreditPartyIdentifier *map[string]any `json:"credit_party_identifier,omitempty"`
	DebitPartyIdentifier *map[string]any `json:"debit_party_identifier,omitempty"`
	Destination map[string]any `json:"destination"`
	ExternalId string `json:"external_id"`
	Id *string `json:"id,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	OperatorReference *string `json:"operator_reference,omitempty"`
	Pin map[string]any `json:"pin"`
	Prices map[string]any `json:"prices"`
	Product *any `json:"product,omitempty"`
	ProductId string `json:"product_id"`
	Promotions *[]any `json:"promotions,omitempty"`
	Rates *any `json:"rates,omitempty"`
	RequestedValues *map[string]any `json:"requested_values,omitempty"`
	Sender *map[string]any `json:"sender,omitempty"`
	Source map[string]any `json:"source"`
	StatementIdentifier *map[string]any `json:"statement_identifier,omitempty"`
	Status *map[string]any `json:"status,omitempty"`
}

// TransactionUpdateData is the typed request payload for Transaction.UpdateTyped.
type TransactionUpdateData struct {
	TransactionId int `json:"transaction_id"`
	AdditionalIdentifier *map[string]any `json:"additional_identifier,omitempty"`
	AdjustedValues *map[string]any `json:"adjusted_values,omitempty"`
	AutoConfirm *bool `json:"auto_confirm,omitempty"`
	Beneficiary *map[string]any `json:"beneficiary,omitempty"`
	Benefits *[]any `json:"benefits,omitempty"`
	CalculationMode *any `json:"calculation_mode,omitempty"`
	CallbackUrl *string `json:"callback_url,omitempty"`
	ConfirmationDate *string `json:"confirmation_date,omitempty"`
	ConfirmationExpirationDate *string `json:"confirmation_expiration_date,omitempty"`
	CreationDate *string `json:"creation_date,omitempty"`
	CreditPartyIdentifier *map[string]any `json:"credit_party_identifier,omitempty"`
	DebitPartyIdentifier *map[string]any `json:"debit_party_identifier,omitempty"`
	Destination *map[string]any `json:"destination,omitempty"`
	ExternalId *string `json:"external_id,omitempty"`
	Id *string `json:"id,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	OperatorReference *string `json:"operator_reference,omitempty"`
	Pin *map[string]any `json:"pin,omitempty"`
	Prices *map[string]any `json:"prices,omitempty"`
	Product *any `json:"product,omitempty"`
	ProductId *string `json:"product_id,omitempty"`
	Promotions *[]any `json:"promotions,omitempty"`
	Rates *any `json:"rates,omitempty"`
	RequestedValues *map[string]any `json:"requested_values,omitempty"`
	Sender *map[string]any `json:"sender,omitempty"`
	Source *map[string]any `json:"source,omitempty"`
	StatementIdentifier *map[string]any `json:"statement_identifier,omitempty"`
	Status *map[string]any `json:"status,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
