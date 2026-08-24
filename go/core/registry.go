package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewServiceEntityFunc func(client *DtoneSDK, entopts map[string]any) DtoneEntity

