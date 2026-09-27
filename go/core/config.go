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
				"mobile_number": map[string]any{},
				"operator": map[string]any{},
				"product": map[string]any{},
				"promotion": map[string]any{},
				"service": map[string]any{},
				"statement": map[string]any{},
				"transaction": map[string]any{},
			},
		},
		"entity": map[string]any{
			"balance": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "available",
						"title": "Available",
						"type": "`$NUMBER`",
						"req": true,
						"format": "double",
					},
					map[string]any{
						"name": "credit_limit",
						"title": "Credit Limit",
						"type": "`$NUMBER`",
						"req": true,
						"format": "double",
					},
					map[string]any{
						"name": "holding",
						"title": "Holding",
						"type": "`$NUMBER`",
						"req": true,
						"format": "double",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "unit",
						"title": "Unit",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "unit_type",
						"title": "Unit Type",
						"type": "`$STRING`",
						"req": true,
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
								"kind": "http",
								"method": "GET",
								"orig": "/balances",
								"segments": []any{
									map[string]any{
										"lit": "balances",
									},
								},
								"parts": []any{
									"balances",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "unit",
											"orig": "unit",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "unit_type",
											"orig": "unit_type",
											"type": "`$STRING`",
											"kind": "query",
										},
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
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "benefit_type",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/benefit-types",
								"segments": []any{
									map[string]any{
										"lit": "benefit-types",
									},
								},
								"parts": []any{
									"benefit-types",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"per_page",
									},
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
						"title": "Description",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "end_date",
						"title": "End Date",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "products",
						"title": "Products",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "start_date",
						"title": "Start Date",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "terms",
						"title": "Terms",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
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
								"kind": "http",
								"method": "GET",
								"orig": "/campaigns",
								"segments": []any{
									map[string]any{
										"lit": "campaigns",
									},
								},
								"parts": []any{
									"campaigns",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country_iso_code",
											"orig": "country_iso_code",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "operator_id",
											"orig": "operator_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "product_id",
											"orig": "product_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/campaigns/{campaign_id}",
								"segments": []any{
									map[string]any{
										"lit": "campaigns",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"campaigns",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"campaign_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "campaign_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"country": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "iso_code",
						"title": "Iso Code",
						"type": "`$STRING`",
						"req": true,
						"short": "Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "regions",
						"title": "Regions",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "country",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/countries",
								"segments": []any{
									map[string]any{
										"lit": "countries",
									},
								},
								"parts": []any{
									"countries",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "service_id",
											"orig": "service_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "subservice_id",
											"orig": "subservice_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/countries/{country_iso_code}",
								"segments": []any{
									map[string]any{
										"lit": "countries",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"countries",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"country_iso_code": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "country_iso_code",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"credit_party_benefit": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "credit_party_identifier",
						"title": "Credit Party Identifier",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "page",
						"title": "Page",
						"type": "`$INTEGER`",
						"short": "Page number",
						"format": "int32",
					},
					map[string]any{
						"name": "per_page",
						"title": "Per Page",
						"type": "`$INTEGER`",
						"short": "Number of records per page",
						"format": "int32",
					},
					map[string]any{
						"name": "service_id",
						"title": "Service Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Service identifier.",
						"format": "int32",
					},
				},
				"name": "credit_party_benefit",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"lookup",
									"credit-party-benefits",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Activation Date",
						"type": "`$STRING`",
						"req": true,
						"short": "A `null` value denotes that credit party has not yet been activated on the actual network",
						"format": "date-time",
					},
					map[string]any{
						"name": "credit_party_identifier",
						"title": "Credit Party Identifier",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "installation_date",
						"title": "Installation Date",
						"type": "`$STRING`",
						"req": true,
						"short": "A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed",
						"format": "date-time",
					},
					map[string]any{
						"name": "service_id",
						"title": "Service Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Service identifier.",
						"format": "int32",
					},
				},
				"name": "credit_party_status",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"lookup",
									"credit-party-status",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"mobile_number": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mobile_number",
						"title": "Mobile Number",
						"type": "`$STRING`",
						"req": true,
						"short": "Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format.",
					},
					map[string]any{
						"name": "page",
						"title": "Page",
						"type": "`$INTEGER`",
						"short": "Page number",
						"format": "int32",
					},
					map[string]any{
						"name": "per_page",
						"title": "Per Page",
						"type": "`$INTEGER`",
						"short": "Number of records per page",
						"format": "int32",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "mobile_number",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"lookup",
									"mobile-number",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
										"mobile_number": "`reqdata`",
									},
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
										"var": "id",
									},
								},
								"parts": []any{
									"lookup",
									"mobile-number",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"mobile_number": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "mobile_number",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"page",
										"per_page",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"operator": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Operator identifier.",
						"format": "int32",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "regions",
						"title": "Regions",
						"type": "`$ARRAY`",
						"req": true,
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
								"kind": "http",
								"method": "GET",
								"orig": "/operators",
								"segments": []any{
									map[string]any{
										"lit": "operators",
									},
								},
								"parts": []any{
									"operators",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country_iso_code",
											"orig": "country_iso_code",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "service_id",
											"orig": "service_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "subservice_id",
											"orig": "subservice_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/operators/{operator_id}",
								"segments": []any{
									map[string]any{
										"lit": "operators",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"operators",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"operator_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "operator_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"product": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "product",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/products",
								"segments": []any{
									map[string]any{
										"lit": "products",
									},
								},
								"parts": []any{
									"products",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "accept_language",
											"orig": "accept_language",
											"type": "`$STRING`",
											"kind": "header",
											"example": "es",
										},
									},
									"query": []any{
										map[string]any{
											"name": "benefit_type",
											"orig": "benefit_type",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "country_iso_code",
											"orig": "country_iso_code",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "operator_id",
											"orig": "operator_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "region",
											"orig": "region",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "service_id",
											"orig": "service_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
											"example": "name",
										},
										map[string]any{
											"name": "subservice_id",
											"orig": "subservice_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "tag",
											"orig": "tag",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/products/{product_id}",
								"segments": []any{
									map[string]any{
										"lit": "products",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"products",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"product_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "accept_language",
											"orig": "accept_language",
											"type": "`$STRING`",
											"kind": "header",
											"example": "es",
										},
									},
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "product_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"accept_language",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"promotion": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "end_date",
						"title": "End Date",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "operator",
						"title": "Operator",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "products",
						"title": "Products",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "start_date",
						"title": "Start Date",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "terms",
						"title": "Terms",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
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
								"kind": "http",
								"method": "GET",
								"orig": "/promotions",
								"segments": []any{
									map[string]any{
										"lit": "promotions",
									},
								},
								"parts": []any{
									"promotions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "accept_language",
											"orig": "accept_language",
											"type": "`$STRING`",
											"kind": "header",
											"example": "es",
										},
									},
									"query": []any{
										map[string]any{
											"name": "country_iso_code",
											"orig": "country_iso_code",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "operator_id",
											"orig": "operator_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "product_id",
											"orig": "product_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/promotions/{promotion_id}",
								"segments": []any{
									map[string]any{
										"lit": "promotions",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"promotions",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"promotion_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "accept_language",
											"orig": "accept_language",
											"type": "`$STRING`",
											"kind": "header",
											"example": "es",
										},
									},
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "promotion_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"accept_language",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"service": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Service identifier.",
						"format": "int32",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "subservices",
						"title": "Subservices",
						"type": "`$ARRAY`",
						"req": true,
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
								"kind": "http",
								"method": "GET",
								"orig": "/services",
								"segments": []any{
									map[string]any{
										"lit": "services",
									},
								},
								"parts": []any{
									"services",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country_iso_code",
											"orig": "country_iso_code",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country_iso_code",
										"page",
										"per_page",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/services/{service_id}",
								"segments": []any{
									map[string]any{
										"lit": "services",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"services",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"service_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "service_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"statement": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "account_number",
						"title": "Account Number",
						"type": "`$STRING`",
						"req": true,
						"short": "Account number.",
					},
					map[string]any{
						"name": "account_qualifier",
						"title": "Account Qualifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "page",
						"title": "Page",
						"type": "`$INTEGER`",
						"short": "Page number",
						"format": "int32",
					},
					map[string]any{
						"name": "per_page",
						"title": "Per Page",
						"type": "`$INTEGER`",
						"short": "Number of records per page",
						"format": "int32",
					},
					map[string]any{
						"name": "product_id",
						"title": "Product Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Product identifier.",
						"format": "int32",
					},
				},
				"name": "statement",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"lookup",
									"statement-inquiry",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Additional Identifier",
						"type": "`$OBJECT`",
						"short": "Additional details for a transaction.",
					},
					map[string]any{
						"name": "adjusted_values",
						"title": "Adjusted Values",
						"type": "`$OBJECT`",
						"readOnly": true,
					},
					map[string]any{
						"name": "auto_confirm",
						"title": "Auto Confirm",
						"type": "`$BOOLEAN`",
						"short": "Determines whether a transaction will be automatically confirmed upon creation or not.",
						"writeOnly": true,
					},
					map[string]any{
						"name": "beneficiary",
						"title": "Beneficiary",
						"type": "`$OBJECT`",
						"short": "Beneficiary details for a transaction.",
					},
					map[string]any{
						"name": "benefits",
						"title": "Benefits",
						"type": "`$ARRAY`",
						"readOnly": true,
					},
					map[string]any{
						"name": "calculation_mode",
						"title": "Calculation Mode",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "callback_url",
						"title": "Callback Url",
						"type": "`$STRING`",
						"short": "Transaction status updates will be sent to this endpoint.",
						"format": "uri",
					},
					map[string]any{
						"name": "confirmation_date",
						"title": "Confirmation Date",
						"type": "`$STRING`",
						"readOnly": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "confirmation_expiration_date",
						"title": "Confirmation Expiration Date",
						"type": "`$STRING`",
						"readOnly": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "creation_date",
						"title": "Creation Date",
						"type": "`$STRING`",
						"readOnly": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "credit_party_identifier",
						"title": "Credit Party Identifier",
						"type": "`$OBJECT`",
						"short": "Receiving account details for a transaction.",
					},
					map[string]any{
						"name": "debit_party_identifier",
						"title": "Debit Party Identifier",
						"type": "`$OBJECT`",
						"short": "Sending account details for a transaction.",
					},
					map[string]any{
						"name": "destination",
						"title": "Destination",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Required for ranged value products and when `calculation_mode` is set to `DESTINATION_AMOUNT`",
						"writeOnly": true,
					},
					map[string]any{
						"name": "external_id",
						"title": "External Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"readOnly": true,
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
						"short": "Optional metadata related to the transaction.",
					},
					map[string]any{
						"name": "operator_reference",
						"title": "Operator Reference",
						"type": "`$STRING`",
						"readOnly": true,
					},
					map[string]any{
						"name": "pin",
						"title": "Pin",
						"type": "`$OBJECT`",
						"req": true,
						"readOnly": true,
					},
					map[string]any{
						"name": "prices",
						"title": "Prices",
						"type": "`$OBJECT`",
						"req": true,
						"readOnly": true,
					},
					map[string]any{
						"name": "product",
						"title": "Product",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "product_id",
						"title": "Product Id",
						"type": "`$STRING`",
						"req": true,
						"writeOnly": true,
					},
					map[string]any{
						"name": "promotions",
						"title": "Promotions",
						"type": "`$ARRAY`",
						"readOnly": true,
					},
					map[string]any{
						"name": "rates",
						"title": "Rates",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "requested_values",
						"title": "Requested Values",
						"type": "`$OBJECT`",
						"readOnly": true,
					},
					map[string]any{
						"name": "sender",
						"title": "Sender",
						"type": "`$OBJECT`",
						"short": "Sender details for a transaction.",
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Required for ranged value products and when `calculation_mode` is set to `SOURCE_AMOUNT`",
						"writeOnly": true,
					},
					map[string]any{
						"name": "statement_identifier",
						"title": "Statement Identifier",
						"type": "`$OBJECT`",
						"short": "Qualifying statement details for a payment transaction.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$OBJECT`",
						"readOnly": true,
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
								"kind": "http",
								"method": "POST",
								"orig": "/transactions/{transaction_id}/cancel",
								"segments": []any{
									map[string]any{
										"lit": "transactions",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "cancel",
									},
								},
								"parts": []any{
									"transactions",
									"{id}",
									"cancel",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"transaction_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "transaction_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "cancel",
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
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
										"var": "id",
									},
									map[string]any{
										"lit": "confirm",
									},
								},
								"parts": []any{
									"async",
									"transactions",
									"{id}",
									"confirm",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"transaction_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "transaction_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "confirm",
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
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
										"var": "id",
									},
									map[string]any{
										"lit": "confirm",
									},
								},
								"parts": []any{
									"sync",
									"transactions",
									"{id}",
									"confirm",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"transaction_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "transaction_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "confirm",
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"async",
									"transactions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
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
								"parts": []any{
									"sync",
									"transactions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/transactions",
								"segments": []any{
									map[string]any{
										"lit": "transactions",
									},
								},
								"parts": []any{
									"transactions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country_iso_code",
											"orig": "country_iso_code",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "credit_party_account_number",
											"orig": "credit_party_account_number",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "credit_party_mobile_number",
											"orig": "credit_party_mobile_number",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "external_id",
											"orig": "external_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "from_date",
											"orig": "from_date",
											"type": "`$STRING`",
											"kind": "query",
											"example": "1970-01-01T00:00:00.000000Z",
										},
										map[string]any{
											"name": "operator_id",
											"orig": "operator_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "product_type",
											"orig": "product_type",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "service_id",
											"orig": "service_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "status_id",
											"orig": "status_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "subservice_id",
											"orig": "subservice_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "to_date",
											"orig": "to_date",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-02-02T14:00:00.022220+08:00",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/transactions/{transaction_id}",
								"segments": []any{
									map[string]any{
										"lit": "transactions",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"transactions",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"transaction_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "transaction_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
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
