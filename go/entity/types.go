// Typed models for the Dtone SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/dtone-sdk/go/core"
)

// Balance is the typed data model for the balance entity.
type Balance struct {
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
}

// BenefitTypeListMatch is the typed request payload for BenefitType.ListTyped.
type BenefitTypeListMatch struct {
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
}

// Campaign is the typed data model for the campaign entity.
type Campaign struct {
}

// CampaignLoadMatch is the typed request payload for Campaign.LoadTyped.
type CampaignLoadMatch struct {
	Id int `json:"id"`
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
}

// CountryLoadMatch is the typed request payload for Country.LoadTyped.
type CountryLoadMatch struct {
	Id string `json:"id"`
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
}

// CreditPartyBenefitCreateData is the typed request payload for CreditPartyBenefit.CreateTyped.
type CreditPartyBenefitCreateData struct {
	CreditPartyIdentifier map[string]any `json:"credit_party_identifier"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	ServiceId int `json:"service_id"`
}

// CreditPartyStatus is the typed data model for the credit_party_status entity.
type CreditPartyStatus struct {
}

// CreditPartyStatusCreateData is the typed request payload for CreditPartyStatus.CreateTyped.
type CreditPartyStatusCreateData struct {
	ActivationDate string `json:"activation_date"`
	CreditPartyIdentifier map[string]any `json:"credit_party_identifier"`
	InstallationDate string `json:"installation_date"`
	ServiceId int `json:"service_id"`
}

// MobileNumber is the typed data model for the mobile_number entity.
type MobileNumber struct {
}

// MobileNumberLoadMatch is the typed request payload for MobileNumber.LoadTyped.
type MobileNumberLoadMatch struct {
	Id string `json:"id"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
}

// MobileNumberCreateData is the typed request payload for MobileNumber.CreateTyped.
type MobileNumberCreateData struct {
	Id *string `json:"id,omitempty"`
	MobileNumber string `json:"mobile_number"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
}

// Operator is the typed data model for the operator entity.
type Operator struct {
}

// OperatorLoadMatch is the typed request payload for Operator.LoadTyped.
type OperatorLoadMatch struct {
	Id int `json:"id"`
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
	Id int `json:"id"`
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
}

// PromotionLoadMatch is the typed request payload for Promotion.LoadTyped.
type PromotionLoadMatch struct {
	Id int `json:"id"`
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
}

// ServiceLoadMatch is the typed request payload for Service.LoadTyped.
type ServiceLoadMatch struct {
	Id int `json:"id"`
}

// ServiceListMatch is the typed request payload for Service.ListTyped.
type ServiceListMatch struct {
	CountryIsoCode *string `json:"country_iso_code,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
}

// Statement is the typed data model for the statement entity.
type Statement struct {
}

// StatementCreateData is the typed request payload for Statement.CreateTyped.
type StatementCreateData struct {
	AccountNumber string `json:"account_number"`
	AccountQualifier *string `json:"account_qualifier,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	ProductId int `json:"product_id"`
}

// Transaction is the typed data model for the transaction entity.
type Transaction struct {
}

// TransactionLoadMatch is the typed request payload for Transaction.LoadTyped.
type TransactionLoadMatch struct {
	Id int `json:"id"`
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
