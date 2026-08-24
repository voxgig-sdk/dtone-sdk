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
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewServiceEntityFunc = func(client *core.DtoneSDK, entopts map[string]any) core.DtoneEntity {
		return entity.NewServiceEntity(client, entopts)
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
var NewTestFeature = feature.NewTestFeature
