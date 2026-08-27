package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Dtone",
			"slug": "dtone",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://preprod-dvs-api.dtone.com/v1",
			"auth": map[string]any{
				"prefix": "Basic",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"balance": map[string]any{},
				"benefit_type": map[string]any{},
				"campaign": map[string]any{},
				"country": map[string]any{},
				"credit_party_benefit": map[string]any{},
				"credit_party_status": map[string]any{},
				"mobile_number_lookup": map[string]any{},
				"operator": map[string]any{},
				"product": map[string]any{},
				"promotion": map[string]any{},
				"service": map[string]any{},
				"statement_inquiry": map[string]any{},
				"transaction": map[string]any{},
			},
		},
		"entity": map[string]any{
			"balance": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "available",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "credit_limit",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "holding",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "unit",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "unit_type",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "balance",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "unit",
											"orig": "unit",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "unit_type",
											"orig": "unit_type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/balances",
								"parts": []any{
									"balances",
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"per_page",
										"unit",
										"unit_type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"benefit_type": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "benefit_type",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/benefit-types",
								"parts": []any{
									"benefit-types",
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"per_page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"campaign": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "end_date",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "products",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "start_date",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "terms",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "campaign",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "country_iso_code",
											"orig": "country_iso_code",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "operator_id",
											"orig": "operator_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "product_id",
											"orig": "product_id",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/campaigns",
								"parts": []any{
									"campaigns",
								},
								"select": map[string]any{
									"exist": []any{
										"country_iso_code",
										"operator_id",
										"page",
										"per_page",
										"product_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "campaign_id",
											"orig": "campaign_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/campaigns/{campaign_id}",
								"parts": []any{
									"campaigns",
									"{campaign_id}",
								},
								"select": map[string]any{
									"exist": []any{
										"campaign_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"campaign",
						},
					},
				},
			},
			"country": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "iso_code",
						"req": true,
						"short": "Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "regions",
						"req": true,
						"type": "`$ARRAY`",
					},
				},
				"name": "country",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "service_id",
											"orig": "service_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "subservice_id",
											"orig": "subservice_id",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/countries",
								"parts": []any{
									"countries",
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"per_page",
										"service_id",
										"subservice_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "country_iso_code",
											"orig": "country_iso_code",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/countries/{country_iso_code}",
								"parts": []any{
									"countries",
									"{country_iso_code}",
								},
								"select": map[string]any{
									"exist": []any{
										"country_iso_code",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"country",
						},
					},
				},
			},
			"credit_party_benefit": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "amount",
						"req": true,
						"short": "Remaining benefit amount.",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "country",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "credit_party_identifier",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "expiration_date",
						"req": true,
						"short": "A `null` value denotes either no expiration applies or that the product benefit has not yet been activated.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "page",
						"short": "Page number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "per_page",
						"short": "Number of records per page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "service_id",
						"req": true,
						"short": "Service identifier.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "type",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "unit",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "unit_type",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "credit_party_benefit",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/lookup/credit-party-benefits",
								"parts": []any{
									"lookup",
									"credit-party-benefits",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"credit_party_status": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "activation_date",
						"req": true,
						"short": "A `null` value denotes that credit party has not yet been activated on the actual network",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "credit_party_identifier",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "installation_date",
						"req": true,
						"short": "A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "service_id",
						"req": true,
						"short": "Service identifier.",
						"type": "`$INTEGER`",
					},
				},
				"name": "credit_party_status",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/lookup/credit-party-status",
								"parts": []any{
									"lookup",
									"credit-party-status",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"mobile_number_lookup": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "country",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "Operator identifier.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "identified",
						"req": true,
						"short": "Indicates whether operator was identified as a direct match",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "mobile_number",
						"req": true,
						"short": "Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "page",
						"short": "Page number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "per_page",
						"short": "Number of records per page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "regions",
						"req": true,
						"type": "`$ARRAY`",
					},
				},
				"name": "mobile_number_lookup",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "mobile_number",
											"orig": "mobile_number",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/lookup/mobile-number/{mobile_number}",
								"parts": []any{
									"lookup",
									"mobile-number",
									"{mobile_number}",
								},
								"select": map[string]any{
									"exist": []any{
										"mobile_number",
										"page",
										"per_page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/lookup/mobile-number",
								"parts": []any{
									"lookup",
									"mobile-number",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"mobile_number",
						},
					},
				},
			},
			"operator": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "country",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "Operator identifier.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "regions",
						"req": true,
						"type": "`$ARRAY`",
					},
				},
				"name": "operator",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "country_iso_code",
											"orig": "country_iso_code",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "service_id",
											"orig": "service_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "subservice_id",
											"orig": "subservice_id",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/operators",
								"parts": []any{
									"operators",
								},
								"select": map[string]any{
									"exist": []any{
										"country_iso_code",
										"page",
										"per_page",
										"service_id",
										"subservice_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "operator_id",
											"orig": "operator_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/operators/{operator_id}",
								"parts": []any{
									"operators",
									"{operator_id}",
								},
								"select": map[string]any{
									"exist": []any{
										"operator_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"operator",
						},
					},
				},
			},
			"product": map[string]any{
				"fields": []any{},
				"name": "product",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"example": "es",
											"kind": "header",
											"name": "accept_language",
											"orig": "accept_language",
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "benefit_type",
											"orig": "benefit_type",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "country_iso_code",
											"orig": "country_iso_code",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "operator_id",
											"orig": "operator_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "region",
											"orig": "region",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "service_id",
											"orig": "service_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "name",
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "subservice_id",
											"orig": "subservice_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "tag",
											"orig": "tag",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/products",
								"parts": []any{
									"products",
								},
								"select": map[string]any{
									"exist": []any{
										"accept_language",
										"benefit_type",
										"country_iso_code",
										"operator_id",
										"page",
										"per_page",
										"region",
										"service_id",
										"sort",
										"subservice_id",
										"tag",
										"type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"example": "es",
											"kind": "header",
											"name": "accept_language",
											"orig": "accept_language",
											"type": "`$STRING`",
										},
									},
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "product_id",
											"orig": "product_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/products/{product_id}",
								"parts": []any{
									"products",
									"{product_id}",
								},
								"select": map[string]any{
									"exist": []any{
										"accept_language",
										"product_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"product",
						},
					},
				},
			},
			"promotion": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "end_date",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "operator",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "products",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "start_date",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "terms",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "promotion",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"example": "es",
											"kind": "header",
											"name": "accept_language",
											"orig": "accept_language",
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "country_iso_code",
											"orig": "country_iso_code",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "operator_id",
											"orig": "operator_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "product_id",
											"orig": "product_id",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/promotions",
								"parts": []any{
									"promotions",
								},
								"select": map[string]any{
									"exist": []any{
										"accept_language",
										"country_iso_code",
										"operator_id",
										"page",
										"per_page",
										"product_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"example": "es",
											"kind": "header",
											"name": "accept_language",
											"orig": "accept_language",
											"type": "`$STRING`",
										},
									},
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "promotion_id",
											"orig": "promotion_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/promotions/{promotion_id}",
								"parts": []any{
									"promotions",
									"{promotion_id}",
								},
								"select": map[string]any{
									"exist": []any{
										"accept_language",
										"promotion_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"promotion",
						},
					},
				},
			},
			"service": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"req": true,
						"short": "Service identifier.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "subservices",
						"req": true,
						"type": "`$ARRAY`",
					},
				},
				"name": "service",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "country_iso_code",
											"orig": "country_iso_code",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/services",
								"parts": []any{
									"services",
								},
								"select": map[string]any{
									"exist": []any{
										"country_iso_code",
										"page",
										"per_page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "service_id",
											"orig": "service_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/services/{service_id}",
								"parts": []any{
									"services",
									"{service_id}",
								},
								"select": map[string]any{
									"exist": []any{
										"service_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"service",
						},
					},
				},
			},
			"statement_inquiry": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "account_number",
						"req": true,
						"short": "Account number.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "account_qualifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "balance",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "dates",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "page",
						"short": "Page number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "per_page",
						"short": "Number of records per page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "product_id",
						"req": true,
						"short": "Product identifier.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "reference",
						"req": true,
						"type": "`$ANY`",
					},
				},
				"name": "statement_inquiry",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/lookup/statement-inquiry",
								"parts": []any{
									"lookup",
									"statement-inquiry",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"transaction": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "additional_identifier",
						"short": "Additional details for a transaction.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "adjusted_values",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "auto_confirm",
						"short": "Determines whether a transaction will be automatically confirmed upon creation or not.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "beneficiary",
						"short": "Beneficiary details for a transaction.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "benefits",
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 1,
						},
					},
					map[string]any{
						"name": "calculation_mode",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "callback_url",
						"short": "Transaction status updates will be sent to this endpoint.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "confirmation_date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "confirmation_expiration_date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "creation_date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "credit_party_identifier",
						"short": "Receiving account details for a transaction.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "debit_party_identifier",
						"short": "Sending account details for a transaction.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "destination",
						"req": true,
						"short": "Required for ranged value products and when `calculation_mode` is set to `DESTINATION_AMOUNT`",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "external_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "metadata",
						"short": "Optional metadata related to the transaction.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "operator_reference",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pin",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "prices",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "product",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "product_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "promotions",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "rates",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "requested_values",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "sender",
						"short": "Sender details for a transaction.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "source",
						"req": true,
						"short": "Required for ranged value products and when `calculation_mode` is set to `SOURCE_AMOUNT`",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "statement_identifier",
						"short": "Qualifying statement details for a payment transaction.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "status",
						"type": "`$OBJECT`",
					},
				},
				"name": "transaction",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/async/transactions",
								"parts": []any{
									"async",
									"transactions",
								},
								"select": map[string]any{
									"$action": "asyncCreate",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/sync/transactions",
								"parts": []any{
									"sync",
									"transactions",
								},
								"select": map[string]any{
									"$action": "syncCreate",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "country_iso_code",
											"orig": "country_iso_code",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "credit_party_account_number",
											"orig": "credit_party_account_number",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "credit_party_mobile_number",
											"orig": "credit_party_mobile_number",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "external_id",
											"orig": "external_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "1970-01-01T00:00:00.000000Z",
											"kind": "query",
											"name": "from_date",
											"orig": "from_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "operator_id",
											"orig": "operator_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "product_type",
											"orig": "product_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "service_id",
											"orig": "service_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "status_id",
											"orig": "status_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "subservice_id",
											"orig": "subservice_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "2020-02-02T14:00:00.022220+08:00",
											"kind": "query",
											"name": "to_date",
											"orig": "to_date",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/transactions",
								"parts": []any{
									"transactions",
								},
								"select": map[string]any{
									"exist": []any{
										"country_iso_code",
										"credit_party_account_number",
										"credit_party_mobile_number",
										"external_id",
										"from_date",
										"operator_id",
										"page",
										"per_page",
										"product_type",
										"service_id",
										"status_id",
										"subservice_id",
										"to_date",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "transaction_id",
											"orig": "transaction_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/transactions/{transaction_id}",
								"parts": []any{
									"transactions",
									"{transaction_id}",
								},
								"select": map[string]any{
									"exist": []any{
										"transaction_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "transaction_id",
											"orig": "transaction_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/transactions/{transaction_id}/cancel",
								"parts": []any{
									"transactions",
									"{transaction_id}",
									"cancel",
								},
								"select": map[string]any{
									"$action": "cancel",
									"exist": []any{
										"transaction_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "transaction_id",
											"orig": "transaction_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/async/transactions/{transaction_id}/confirm",
								"parts": []any{
									"async",
									"transactions",
									"{transaction_id}",
									"confirm",
								},
								"select": map[string]any{
									"$action": "confirmAsync",
									"exist": []any{
										"transaction_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "transaction_id",
											"orig": "transaction_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/sync/transactions/{transaction_id}/confirm",
								"parts": []any{
									"sync",
									"transactions",
									"{transaction_id}",
									"confirm",
								},
								"select": map[string]any{
									"$action": "confirmSync",
									"exist": []any{
										"transaction_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"transaction",
						},
					},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
