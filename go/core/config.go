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
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"format": "double",
						"name": "available",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "double",
						"name": "credit_limit",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "double",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "balances",
									},
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
								"parts": []any{
									"balances",
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
								"segments": []any{
									map[string]any{
										"lit": "benefit-types",
									},
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
								"parts": []any{
									"benefit-types",
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
						"format": "date-time",
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
						"format": "date-time",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "campaigns",
									},
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
								"parts": []any{
									"campaigns",
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
								"segments": []any{
									map[string]any{
										"lit": "campaigns",
									},
									map[string]any{
										"var": "campaign_id",
									},
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
								"parts": []any{
									"campaigns",
									"{campaign_id}",
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
								"segments": []any{
									map[string]any{
										"lit": "countries",
									},
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
								"parts": []any{
									"countries",
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
								"segments": []any{
									map[string]any{
										"lit": "countries",
									},
									map[string]any{
										"var": "country_iso_code",
									},
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
								"parts": []any{
									"countries",
									"{country_iso_code}",
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
						"format": "double",
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
						"format": "date-time",
						"name": "expiration_date",
						"req": true,
						"short": "A `null` value denotes either no expiration applies or that the product benefit has not yet been activated.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "int32",
						"name": "page",
						"short": "Page number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "int32",
						"name": "per_page",
						"short": "Number of records per page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "int32",
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
								"segments": []any{
									map[string]any{
										"lit": "lookup",
									},
									map[string]any{
										"lit": "credit-party-benefits",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"lookup",
									"credit-party-benefits",
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
						"format": "date-time",
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
						"format": "date-time",
						"name": "installation_date",
						"req": true,
						"short": "A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "int32",
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
								"segments": []any{
									map[string]any{
										"lit": "lookup",
									},
									map[string]any{
										"lit": "credit-party-status",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"lookup",
									"credit-party-status",
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
						"format": "int32",
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
						"format": "int32",
						"name": "page",
						"short": "Page number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "int32",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "lookup",
									},
									map[string]any{
										"lit": "mobile-number",
									},
									map[string]any{
										"var": "mobile_number",
									},
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
								"parts": []any{
									"lookup",
									"mobile-number",
									"{mobile_number}",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/lookup/mobile-number",
								"segments": []any{
									map[string]any{
										"lit": "lookup",
									},
									map[string]any{
										"lit": "mobile-number",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"lookup",
									"mobile-number",
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
						"format": "int32",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "operators",
									},
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
								"parts": []any{
									"operators",
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
								"segments": []any{
									map[string]any{
										"lit": "operators",
									},
									map[string]any{
										"var": "operator_id",
									},
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
								"parts": []any{
									"operators",
									"{operator_id}",
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
								"segments": []any{
									map[string]any{
										"lit": "products",
									},
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
								"parts": []any{
									"products",
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
								"segments": []any{
									map[string]any{
										"lit": "products",
									},
									map[string]any{
										"var": "product_id",
									},
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
								"parts": []any{
									"products",
									"{product_id}",
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
						"format": "date-time",
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
						"format": "date-time",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "promotions",
									},
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
								"parts": []any{
									"promotions",
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
								"segments": []any{
									map[string]any{
										"lit": "promotions",
									},
									map[string]any{
										"var": "promotion_id",
									},
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
								"parts": []any{
									"promotions",
									"{promotion_id}",
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
						"format": "int32",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "services",
									},
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
								"parts": []any{
									"services",
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
								"segments": []any{
									map[string]any{
										"lit": "services",
									},
									map[string]any{
										"var": "service_id",
									},
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
								"parts": []any{
									"services",
									"{service_id}",
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
						"format": "int32",
						"name": "page",
						"short": "Page number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "int32",
						"name": "per_page",
						"short": "Number of records per page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "int32",
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
								"segments": []any{
									map[string]any{
										"lit": "lookup",
									},
									map[string]any{
										"lit": "statement-inquiry",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"lookup",
									"statement-inquiry",
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
						"readOnly": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "auto_confirm",
						"short": "Determines whether a transaction will be automatically confirmed upon creation or not.",
						"type": "`$BOOLEAN`",
						"writeOnly": true,
					},
					map[string]any{
						"name": "beneficiary",
						"short": "Beneficiary details for a transaction.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "benefits",
						"readOnly": true,
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
						"format": "uri",
						"name": "callback_url",
						"short": "Transaction status updates will be sent to this endpoint.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "confirmation_date",
						"readOnly": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "confirmation_expiration_date",
						"readOnly": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "creation_date",
						"readOnly": true,
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
						"writeOnly": true,
					},
					map[string]any{
						"name": "external_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"readOnly": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "metadata",
						"short": "Optional metadata related to the transaction.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "operator_reference",
						"readOnly": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pin",
						"readOnly": true,
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "prices",
						"readOnly": true,
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
						"writeOnly": true,
					},
					map[string]any{
						"name": "promotions",
						"readOnly": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "rates",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "requested_values",
						"readOnly": true,
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
						"writeOnly": true,
					},
					map[string]any{
						"name": "statement_identifier",
						"short": "Qualifying statement details for a payment transaction.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "status",
						"readOnly": true,
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "async",
									},
									map[string]any{
										"lit": "transactions",
									},
								},
								"select": map[string]any{
									"$action": "asyncCreate",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"async",
									"transactions",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/sync/transactions",
								"segments": []any{
									map[string]any{
										"lit": "sync",
									},
									map[string]any{
										"lit": "transactions",
									},
								},
								"select": map[string]any{
									"$action": "syncCreate",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"sync",
									"transactions",
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
								"segments": []any{
									map[string]any{
										"lit": "transactions",
									},
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
								"parts": []any{
									"transactions",
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
								"segments": []any{
									map[string]any{
										"lit": "transactions",
									},
									map[string]any{
										"var": "transaction_id",
									},
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
								"parts": []any{
									"transactions",
									"{transaction_id}",
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
								"segments": []any{
									map[string]any{
										"lit": "transactions",
									},
									map[string]any{
										"var": "transaction_id",
									},
									map[string]any{
										"lit": "cancel",
									},
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
								"parts": []any{
									"transactions",
									"{transaction_id}",
									"cancel",
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
								"segments": []any{
									map[string]any{
										"lit": "async",
									},
									map[string]any{
										"lit": "transactions",
									},
									map[string]any{
										"var": "transaction_id",
									},
									map[string]any{
										"lit": "confirm",
									},
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
								"parts": []any{
									"async",
									"transactions",
									"{transaction_id}",
									"confirm",
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
								"segments": []any{
									map[string]any{
										"lit": "sync",
									},
									map[string]any{
										"lit": "transactions",
									},
									map[string]any{
										"var": "transaction_id",
									},
									map[string]any{
										"lit": "confirm",
									},
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
								"parts": []any{
									"sync",
									"transactions",
									"{transaction_id}",
									"confirm",
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
