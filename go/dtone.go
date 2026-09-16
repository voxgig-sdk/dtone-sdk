package voxgigdtonesdk

import (
	"github.com/voxgig-sdk/dtone-sdk/go/core"
	"github.com/voxgig-sdk/dtone-sdk/go/entity"
	"github.com/voxgig-sdk/dtone-sdk/go/feature"
	_ "github.com/voxgig-sdk/dtone-sdk/go/utility"
)

// Type aliases preserve external API.
type DtoneSDK = core.DtoneSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type DtoneEntity = core.DtoneEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type DtoneError = core.DtoneError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewDebugFeatureFunc = func() core.Feature {
		return feature.NewDebugFeature()
	}
	core.NewIdempotencyFeatureFunc = func() core.Feature {
		return feature.NewIdempotencyFeature()
	}
	core.NewMetricsFeatureFunc = func() core.Feature {
		return feature.NewMetricsFeature()
	}
	core.NewPagingFeatureFunc = func() core.Feature {
		return feature.NewPagingFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewBalanceEntityFunc = func(client *core.DtoneSDK, entopts map[string]any) core.DtoneEntity {
		return entity.NewBalanceEntity(client, entopts)
	}
	core.NewBenefitTypeEntityFunc = func(client *core.DtoneSDK, entopts map[string]any) core.DtoneEntity {
		return entity.NewBenefitTypeEntity(client, entopts)
	}
	core.NewCampaignEntityFunc = func(client *core.DtoneSDK, entopts map[string]any) core.DtoneEntity {
		return entity.NewCampaignEntity(client, entopts)
	}
	core.NewCountryEntityFunc = func(client *core.DtoneSDK, entopts map[string]any) core.DtoneEntity {
		return entity.NewCountryEntity(client, entopts)
	}
	core.NewCreditPartyBenefitEntityFunc = func(client *core.DtoneSDK, entopts map[string]any) core.DtoneEntity {
		return entity.NewCreditPartyBenefitEntity(client, entopts)
	}
	core.NewCreditPartyStatusEntityFunc = func(client *core.DtoneSDK, entopts map[string]any) core.DtoneEntity {
		return entity.NewCreditPartyStatusEntity(client, entopts)
	}
	core.NewMobileNumberLookupEntityFunc = func(client *core.DtoneSDK, entopts map[string]any) core.DtoneEntity {
		return entity.NewMobileNumberLookupEntity(client, entopts)
	}
	core.NewOperatorEntityFunc = func(client *core.DtoneSDK, entopts map[string]any) core.DtoneEntity {
		return entity.NewOperatorEntity(client, entopts)
	}
	core.NewProductEntityFunc = func(client *core.DtoneSDK, entopts map[string]any) core.DtoneEntity {
		return entity.NewProductEntity(client, entopts)
	}
	core.NewPromotionEntityFunc = func(client *core.DtoneSDK, entopts map[string]any) core.DtoneEntity {
		return entity.NewPromotionEntity(client, entopts)
	}
	core.NewServiceEntityFunc = func(client *core.DtoneSDK, entopts map[string]any) core.DtoneEntity {
		return entity.NewServiceEntity(client, entopts)
	}
	core.NewStatementInquiryEntityFunc = func(client *core.DtoneSDK, entopts map[string]any) core.DtoneEntity {
		return entity.NewStatementInquiryEntity(client, entopts)
	}
	core.NewTransactionEntityFunc = func(client *core.DtoneSDK, entopts map[string]any) core.DtoneEntity {
		return entity.NewTransactionEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewDtoneSDK = core.NewDtoneSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewDtoneSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *DtoneSDK  { return NewDtoneSDK(nil) }
func Test() *DtoneSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewDebugFeature = feature.NewDebugFeature
var NewIdempotencyFeature = feature.NewIdempotencyFeature
var NewMetricsFeature = feature.NewMetricsFeature
var NewPagingFeature = feature.NewPagingFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
