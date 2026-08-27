package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBalanceEntityFunc func(client *DtoneSDK, entopts map[string]any) DtoneEntity

var NewBenefitTypeEntityFunc func(client *DtoneSDK, entopts map[string]any) DtoneEntity

var NewCampaignEntityFunc func(client *DtoneSDK, entopts map[string]any) DtoneEntity

var NewCountryEntityFunc func(client *DtoneSDK, entopts map[string]any) DtoneEntity

var NewCreditPartyBenefitEntityFunc func(client *DtoneSDK, entopts map[string]any) DtoneEntity

var NewCreditPartyStatusEntityFunc func(client *DtoneSDK, entopts map[string]any) DtoneEntity

var NewMobileNumberLookupEntityFunc func(client *DtoneSDK, entopts map[string]any) DtoneEntity

var NewOperatorEntityFunc func(client *DtoneSDK, entopts map[string]any) DtoneEntity

var NewProductEntityFunc func(client *DtoneSDK, entopts map[string]any) DtoneEntity

var NewPromotionEntityFunc func(client *DtoneSDK, entopts map[string]any) DtoneEntity

var NewServiceEntityFunc func(client *DtoneSDK, entopts map[string]any) DtoneEntity

var NewStatementInquiryEntityFunc func(client *DtoneSDK, entopts map[string]any) DtoneEntity

var NewTransactionEntityFunc func(client *DtoneSDK, entopts map[string]any) DtoneEntity

