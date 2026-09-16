
const { BaseFeature } = require('./feature/base/BaseFeature')
const { DebugFeature } = require('./feature/debug/DebugFeature')
const { IdempotencyFeature } = require('./feature/idempotency/IdempotencyFeature')
const { MetricsFeature } = require('./feature/metrics/MetricsFeature')
const { PagingFeature } = require('./feature/paging/PagingFeature')
const { RatelimitFeature } = require('./feature/ratelimit/RatelimitFeature')
const { RetryFeature } = require('./feature/retry/RetryFeature')
const { TestFeature } = require('./feature/test/TestFeature')
const { TimeoutFeature } = require('./feature/timeout/TimeoutFeature')



const FEATURE_CLASS = {
   debug: DebugFeature,
 idempotency: IdempotencyFeature,
 metrics: MetricsFeature,
 paging: PagingFeature,
 ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named requires above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
//
// Read by SecretsFeature through a DEFERRED require of this module: the
// requires above make the pair circular, and this file replaces
// module.exports at the end of its body, so anything reading the map at
// module load would get undefined. See tm/js/src/feature/secrets.
const FEATURE_PLUGINS = {
  
}


class Config {

  makeFeature(fn) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(fn) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Dtone',
        slug: "dtone",
    version: "0.0.1",
    target: "js",

  }


  feature = {
     debug:     {
      "options": {
        "active": false,
        "max": 100,
        "redact": [
          "authorization",
          "cookie",
          "set-cookie",
          "api-key",
          "apikey",
          "x-api-key",
          "idempotency-key"
        ]
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "onEntry": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 idempotency:     {
      "options": {
        "active": false,
        "header": "Idempotency-Key",
        "methods": [
          "POST",
          "PUT",
          "PATCH",
          "DELETE"
        ],
        "ops": [
          "create",
          "update",
          "remove"
        ]
      },
      "optspec": {
        "keygen": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 metrics:     {
      "options": {
        "active": false
      },
      "optspec": {
        "now": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 paging:     {
      "options": {
        "active": false,
        "afterVar": "after",
        "cursorParam": "cursor",
        "firstVar": "first",
        "limitParam": "limit",
        "pageParam": "page",
        "startPage": 1
      },
      "optspec": {
        "limit": "`$NUMBER`",
        "ops": "`$LIST`"
      },
      "strict": false,
      "transport": "none"
    },
 ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://preprod-dvs-api.dtone.com/v1",

    auth: {
      prefix: 'Basic',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        balance: {
        },
  
        benefit_type: {
        },
  
        campaign: {
        },
  
        country: {
        },
  
        credit_party_benefit: {
        },
  
        credit_party_status: {
        },
  
        mobile_number_lookup: {
        },
  
        operator: {
        },
  
        product: {
        },
  
        promotion: {
        },
  
        service: {
        },
  
        statement_inquiry: {
        },
  
        transaction: {
        },
  
    }
  }


  entity = {
    "balance": {
      "fields": [
        {
          "format": "double",
          "name": "available",
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "format": "double",
          "name": "credit_limit",
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "format": "double",
          "name": "holding",
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "name": "id",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "unit",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "unit_type",
          "req": true,
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "balance",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 50,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "unit",
                    "orig": "unit",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "unit_type",
                    "orig": "unit_type",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/balances",
              "segments": [
                {
                  "lit": "balances"
                }
              ],
              "select": {
                "exist": [
                  "page",
                  "per_page",
                  "unit",
                  "unit_type"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "balances"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "benefit_type": {
      "fields": [
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        }
      ],
      "name": "benefit_type",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 50,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/benefit-types",
              "segments": [
                {
                  "lit": "benefit-types"
                }
              ],
              "select": {
                "exist": [
                  "page",
                  "per_page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "benefit-types"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "campaign": {
      "fields": [
        {
          "name": "description",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "end_date",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "products",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "format": "date-time",
          "name": "start_date",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "terms",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "req": true,
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "campaign",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "country_iso_code",
                    "orig": "country_iso_code",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "operator_id",
                    "orig": "operator_id",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 50,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "product_id",
                    "orig": "product_id",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/campaigns",
              "segments": [
                {
                  "lit": "campaigns"
                }
              ],
              "select": {
                "exist": [
                  "country_iso_code",
                  "operator_id",
                  "page",
                  "per_page",
                  "product_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "campaigns"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "campaign_id",
                    "orig": "campaign_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/campaigns/{campaign_id}",
              "segments": [
                {
                  "lit": "campaigns"
                },
                {
                  "var": "campaign_id"
                }
              ],
              "select": {
                "exist": [
                  "campaign_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "campaigns",
                "{campaign_id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "campaign"
          ]
        ]
      }
    },
    "country": {
      "fields": [
        {
          "name": "iso_code",
          "req": true,
          "short": "Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format.",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "regions",
          "req": true,
          "type": "`$ARRAY`"
        }
      ],
      "name": "country",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 50,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "service_id",
                    "orig": "service_id",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "subservice_id",
                    "orig": "subservice_id",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/countries",
              "segments": [
                {
                  "lit": "countries"
                }
              ],
              "select": {
                "exist": [
                  "page",
                  "per_page",
                  "service_id",
                  "subservice_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "countries"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "country_iso_code",
                    "orig": "country_iso_code",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/countries/{country_iso_code}",
              "segments": [
                {
                  "lit": "countries"
                },
                {
                  "var": "country_iso_code"
                }
              ],
              "select": {
                "exist": [
                  "country_iso_code"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "countries",
                "{country_iso_code}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "country"
          ]
        ]
      }
    },
    "credit_party_benefit": {
      "fields": [
        {
          "format": "double",
          "name": "amount",
          "req": true,
          "short": "Remaining benefit amount.",
          "type": "`$NUMBER`"
        },
        {
          "name": "country",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "credit_party_identifier",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "format": "date-time",
          "name": "expiration_date",
          "req": true,
          "short": "A `null` value denotes either no expiration applies or that the product benefit has not yet been activated.",
          "type": "`$STRING`"
        },
        {
          "format": "int32",
          "name": "page",
          "short": "Page number",
          "type": "`$INTEGER`"
        },
        {
          "format": "int32",
          "name": "per_page",
          "short": "Number of records per page",
          "type": "`$INTEGER`"
        },
        {
          "format": "int32",
          "name": "service_id",
          "req": true,
          "short": "Service identifier.",
          "type": "`$INTEGER`"
        },
        {
          "name": "type",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "unit",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "unit_type",
          "req": true,
          "type": "`$STRING`"
        }
      ],
      "name": "credit_party_benefit",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/lookup/credit-party-benefits",
              "segments": [
                {
                  "lit": "lookup"
                },
                {
                  "lit": "credit-party-benefits"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "lookup",
                "credit-party-benefits"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "credit_party_status": {
      "fields": [
        {
          "format": "date-time",
          "name": "activation_date",
          "req": true,
          "short": "A `null` value denotes that credit party has not yet been activated on the actual network",
          "type": "`$STRING`"
        },
        {
          "name": "credit_party_identifier",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "format": "date-time",
          "name": "installation_date",
          "req": true,
          "short": "A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed",
          "type": "`$STRING`"
        },
        {
          "format": "int32",
          "name": "service_id",
          "req": true,
          "short": "Service identifier.",
          "type": "`$INTEGER`"
        }
      ],
      "name": "credit_party_status",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/lookup/credit-party-status",
              "segments": [
                {
                  "lit": "lookup"
                },
                {
                  "lit": "credit-party-status"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "lookup",
                "credit-party-status"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "mobile_number_lookup": {
      "fields": [
        {
          "name": "country",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "format": "int32",
          "name": "id",
          "req": true,
          "short": "Operator identifier.",
          "type": "`$INTEGER`"
        },
        {
          "name": "identified",
          "req": true,
          "short": "Indicates whether operator was identified as a direct match",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "mobile_number",
          "req": true,
          "short": "Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format.",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "format": "int32",
          "name": "page",
          "short": "Page number",
          "type": "`$INTEGER`"
        },
        {
          "format": "int32",
          "name": "per_page",
          "short": "Number of records per page",
          "type": "`$INTEGER`"
        },
        {
          "name": "regions",
          "req": true,
          "type": "`$ARRAY`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "mobile_number_lookup",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "mobile_number",
                    "orig": "mobile_number",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 50,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/lookup/mobile-number/{mobile_number}",
              "segments": [
                {
                  "lit": "lookup"
                },
                {
                  "lit": "mobile-number"
                },
                {
                  "var": "mobile_number"
                }
              ],
              "select": {
                "exist": [
                  "mobile_number",
                  "page",
                  "per_page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "lookup",
                "mobile-number",
                "{mobile_number}"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/lookup/mobile-number",
              "segments": [
                {
                  "lit": "lookup"
                },
                {
                  "lit": "mobile-number"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "lookup",
                "mobile-number"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "mobile_number"
          ]
        ]
      }
    },
    "operator": {
      "fields": [
        {
          "name": "country",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "format": "int32",
          "name": "id",
          "req": true,
          "short": "Operator identifier.",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "regions",
          "req": true,
          "type": "`$ARRAY`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "operator",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "country_iso_code",
                    "orig": "country_iso_code",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 50,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "service_id",
                    "orig": "service_id",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "subservice_id",
                    "orig": "subservice_id",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/operators",
              "segments": [
                {
                  "lit": "operators"
                }
              ],
              "select": {
                "exist": [
                  "country_iso_code",
                  "page",
                  "per_page",
                  "service_id",
                  "subservice_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "operators"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "operator_id",
                    "orig": "operator_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/operators/{operator_id}",
              "segments": [
                {
                  "lit": "operators"
                },
                {
                  "var": "operator_id"
                }
              ],
              "select": {
                "exist": [
                  "operator_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "operators",
                "{operator_id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "operator"
          ]
        ]
      }
    },
    "product": {
      "fields": [],
      "name": "product",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "header": [
                  {
                    "example": "es",
                    "kind": "header",
                    "name": "accept_language",
                    "orig": "accept_language",
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "benefit_type",
                    "orig": "benefit_type",
                    "type": "`$ARRAY`"
                  },
                  {
                    "kind": "query",
                    "name": "country_iso_code",
                    "orig": "country_iso_code",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "operator_id",
                    "orig": "operator_id",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 50,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "region",
                    "orig": "region",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "service_id",
                    "orig": "service_id",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "name",
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "subservice_id",
                    "orig": "subservice_id",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ARRAY`"
                  },
                  {
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/products",
              "segments": [
                {
                  "lit": "products"
                }
              ],
              "select": {
                "exist": [
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
                  "type"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "products"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "header": [
                  {
                    "example": "es",
                    "kind": "header",
                    "name": "accept_language",
                    "orig": "accept_language",
                    "type": "`$STRING`"
                  }
                ],
                "params": [
                  {
                    "kind": "param",
                    "name": "product_id",
                    "orig": "product_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/products/{product_id}",
              "segments": [
                {
                  "lit": "products"
                },
                {
                  "var": "product_id"
                }
              ],
              "select": {
                "exist": [
                  "accept_language",
                  "product_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "products",
                "{product_id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "product"
          ]
        ]
      }
    },
    "promotion": {
      "fields": [
        {
          "name": "description",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "end_date",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "operator",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "products",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "format": "date-time",
          "name": "start_date",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "terms",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "req": true,
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "promotion",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "header": [
                  {
                    "example": "es",
                    "kind": "header",
                    "name": "accept_language",
                    "orig": "accept_language",
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "country_iso_code",
                    "orig": "country_iso_code",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "operator_id",
                    "orig": "operator_id",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 50,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "product_id",
                    "orig": "product_id",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/promotions",
              "segments": [
                {
                  "lit": "promotions"
                }
              ],
              "select": {
                "exist": [
                  "accept_language",
                  "country_iso_code",
                  "operator_id",
                  "page",
                  "per_page",
                  "product_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "promotions"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "header": [
                  {
                    "example": "es",
                    "kind": "header",
                    "name": "accept_language",
                    "orig": "accept_language",
                    "type": "`$STRING`"
                  }
                ],
                "params": [
                  {
                    "kind": "param",
                    "name": "promotion_id",
                    "orig": "promotion_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/promotions/{promotion_id}",
              "segments": [
                {
                  "lit": "promotions"
                },
                {
                  "var": "promotion_id"
                }
              ],
              "select": {
                "exist": [
                  "accept_language",
                  "promotion_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "promotions",
                "{promotion_id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "promotion"
          ]
        ]
      }
    },
    "service": {
      "fields": [
        {
          "format": "int32",
          "name": "id",
          "req": true,
          "short": "Service identifier.",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "subservices",
          "req": true,
          "type": "`$ARRAY`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "service",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "country_iso_code",
                    "orig": "country_iso_code",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 50,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/services",
              "segments": [
                {
                  "lit": "services"
                }
              ],
              "select": {
                "exist": [
                  "country_iso_code",
                  "page",
                  "per_page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "services"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "service_id",
                    "orig": "service_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/services/{service_id}",
              "segments": [
                {
                  "lit": "services"
                },
                {
                  "var": "service_id"
                }
              ],
              "select": {
                "exist": [
                  "service_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "services",
                "{service_id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "service"
          ]
        ]
      }
    },
    "statement_inquiry": {
      "fields": [
        {
          "name": "account_number",
          "req": true,
          "short": "Account number.",
          "type": "`$STRING`"
        },
        {
          "name": "account_qualifier",
          "type": "`$STRING`"
        },
        {
          "name": "balance",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "dates",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "format": "int32",
          "name": "page",
          "short": "Page number",
          "type": "`$INTEGER`"
        },
        {
          "format": "int32",
          "name": "per_page",
          "short": "Number of records per page",
          "type": "`$INTEGER`"
        },
        {
          "format": "int32",
          "name": "product_id",
          "req": true,
          "short": "Product identifier.",
          "type": "`$INTEGER`"
        },
        {
          "name": "reference",
          "req": true,
          "type": "`$ANY`"
        }
      ],
      "name": "statement_inquiry",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/lookup/statement-inquiry",
              "segments": [
                {
                  "lit": "lookup"
                },
                {
                  "lit": "statement-inquiry"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "lookup",
                "statement-inquiry"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "transaction": {
      "fields": [
        {
          "name": "additional_identifier",
          "short": "Additional details for a transaction.",
          "type": "`$OBJECT`"
        },
        {
          "name": "adjusted_values",
          "readOnly": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "auto_confirm",
          "short": "Determines whether a transaction will be automatically confirmed upon creation or not.",
          "type": "`$BOOLEAN`",
          "writeOnly": true
        },
        {
          "name": "beneficiary",
          "short": "Beneficiary details for a transaction.",
          "type": "`$OBJECT`"
        },
        {
          "name": "benefits",
          "readOnly": true,
          "type": "`$ARRAY`",
          "union": {
            "branches": 2,
            "count": 1,
            "depth": 1
          }
        },
        {
          "name": "calculation_mode",
          "type": "`$ANY`"
        },
        {
          "format": "uri",
          "name": "callback_url",
          "short": "Transaction status updates will be sent to this endpoint.",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "confirmation_date",
          "readOnly": true,
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "confirmation_expiration_date",
          "readOnly": true,
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "creation_date",
          "readOnly": true,
          "type": "`$STRING`"
        },
        {
          "name": "credit_party_identifier",
          "short": "Receiving account details for a transaction.",
          "type": "`$OBJECT`"
        },
        {
          "name": "debit_party_identifier",
          "short": "Sending account details for a transaction.",
          "type": "`$OBJECT`"
        },
        {
          "name": "destination",
          "req": true,
          "short": "Required for ranged value products and when `calculation_mode` is set to `DESTINATION_AMOUNT`",
          "type": "`$OBJECT`",
          "writeOnly": true
        },
        {
          "name": "external_id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "readOnly": true,
          "type": "`$STRING`"
        },
        {
          "name": "metadata",
          "short": "Optional metadata related to the transaction.",
          "type": "`$OBJECT`"
        },
        {
          "name": "operator_reference",
          "readOnly": true,
          "type": "`$STRING`"
        },
        {
          "name": "pin",
          "readOnly": true,
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "prices",
          "readOnly": true,
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "product",
          "type": "`$ANY`"
        },
        {
          "name": "product_id",
          "req": true,
          "type": "`$STRING`",
          "writeOnly": true
        },
        {
          "name": "promotions",
          "readOnly": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "rates",
          "type": "`$ANY`"
        },
        {
          "name": "requested_values",
          "readOnly": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "sender",
          "short": "Sender details for a transaction.",
          "type": "`$OBJECT`"
        },
        {
          "name": "source",
          "req": true,
          "short": "Required for ranged value products and when `calculation_mode` is set to `SOURCE_AMOUNT`",
          "type": "`$OBJECT`",
          "writeOnly": true
        },
        {
          "name": "statement_identifier",
          "short": "Qualifying statement details for a payment transaction.",
          "type": "`$OBJECT`"
        },
        {
          "name": "status",
          "readOnly": true,
          "type": "`$OBJECT`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "transaction",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/async/transactions",
              "segments": [
                {
                  "lit": "async"
                },
                {
                  "lit": "transactions"
                }
              ],
              "select": {
                "$action": "asyncCreate"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "async",
                "transactions"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/sync/transactions",
              "segments": [
                {
                  "lit": "sync"
                },
                {
                  "lit": "transactions"
                }
              ],
              "select": {
                "$action": "syncCreate"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "sync",
                "transactions"
              ]
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "country_iso_code",
                    "orig": "country_iso_code",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "credit_party_account_number",
                    "orig": "credit_party_account_number",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "credit_party_mobile_number",
                    "orig": "credit_party_mobile_number",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "external_id",
                    "orig": "external_id",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "1970-01-01T00:00:00.000000Z",
                    "kind": "query",
                    "name": "from_date",
                    "orig": "from_date",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "operator_id",
                    "orig": "operator_id",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 50,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "product_type",
                    "orig": "product_type",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "service_id",
                    "orig": "service_id",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "status_id",
                    "orig": "status_id",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "subservice_id",
                    "orig": "subservice_id",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "2020-02-02T14:00:00.022220+08:00",
                    "kind": "query",
                    "name": "to_date",
                    "orig": "to_date",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/transactions",
              "segments": [
                {
                  "lit": "transactions"
                }
              ],
              "select": {
                "exist": [
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
                  "to_date"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "transactions"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "transaction_id",
                    "orig": "transaction_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/transactions/{transaction_id}",
              "segments": [
                {
                  "lit": "transactions"
                },
                {
                  "var": "transaction_id"
                }
              ],
              "select": {
                "exist": [
                  "transaction_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "transactions",
                "{transaction_id}"
              ]
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "transaction_id",
                    "orig": "transaction_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/transactions/{transaction_id}/cancel",
              "segments": [
                {
                  "lit": "transactions"
                },
                {
                  "var": "transaction_id"
                },
                {
                  "lit": "cancel"
                }
              ],
              "select": {
                "$action": "cancel",
                "exist": [
                  "transaction_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "transactions",
                "{transaction_id}",
                "cancel"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "transaction_id",
                    "orig": "transaction_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/async/transactions/{transaction_id}/confirm",
              "segments": [
                {
                  "lit": "async"
                },
                {
                  "lit": "transactions"
                },
                {
                  "var": "transaction_id"
                },
                {
                  "lit": "confirm"
                }
              ],
              "select": {
                "$action": "confirmAsync",
                "exist": [
                  "transaction_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "async",
                "transactions",
                "{transaction_id}",
                "confirm"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "transaction_id",
                    "orig": "transaction_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/sync/transactions/{transaction_id}/confirm",
              "segments": [
                {
                  "lit": "sync"
                },
                {
                  "lit": "transactions"
                },
                {
                  "var": "transaction_id"
                },
                {
                  "lit": "confirm"
                }
              ],
              "select": {
                "$action": "confirmSync",
                "exist": [
                  "transaction_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "sync",
                "transactions",
                "{transaction_id}",
                "confirm"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "transaction"
          ]
        ]
      }
    }
  }
}


const config = new Config()

module.exports = {
  config,
  FEATURE_PLUGINS,
}

