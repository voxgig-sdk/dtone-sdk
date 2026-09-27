# Dtone SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Dtone",
            "slug": "dtone",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://preprod-dvs-api.dtone.com/v1",
            "auth": {
                "prefix": "Basic",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "balance": {},
                "benefit_type": {},
                "campaign": {},
                "country": {},
                "credit_party_benefit": {},
                "credit_party_status": {},
                "mobile_number": {},
                "operator": {},
                "product": {},
                "promotion": {},
                "service": {},
                "statement": {},
                "transaction": {},
            },
        },
        "entity": {
      "balance": {
        "fields": [
          {
            "name": "available",
            "title": "Available",
            "type": "`$NUMBER`",
            "req": True,
            "format": "double",
          },
          {
            "name": "credit_limit",
            "title": "Credit Limit",
            "type": "`$NUMBER`",
            "req": True,
            "format": "double",
          },
          {
            "name": "holding",
            "title": "Holding",
            "type": "`$NUMBER`",
            "req": True,
            "format": "double",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "unit",
            "title": "Unit",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "unit_type",
            "title": "Unit Type",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "balance",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/balances",
                "segments": [
                  {
                    "lit": "balances",
                  },
                ],
                "parts": [
                  "balances",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 50,
                    },
                    {
                      "name": "unit",
                      "orig": "unit",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "unit_type",
                      "orig": "unit_type",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "page",
                    "per_page",
                    "unit",
                    "unit_type",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "benefit_type": {
        "fields": [
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "benefit_type",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/benefit-types",
                "segments": [
                  {
                    "lit": "benefit-types",
                  },
                ],
                "parts": [
                  "benefit-types",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 50,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "page",
                    "per_page",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "campaign": {
        "fields": [
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "end_date",
            "title": "End Date",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "products",
            "title": "Products",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "start_date",
            "title": "Start Date",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "terms",
            "title": "Terms",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "campaign",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/campaigns",
                "segments": [
                  {
                    "lit": "campaigns",
                  },
                ],
                "parts": [
                  "campaigns",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "country_iso_code",
                      "orig": "country_iso_code",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "operator_id",
                      "orig": "operator_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 50,
                    },
                    {
                      "name": "product_id",
                      "orig": "product_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "country_iso_code",
                    "operator_id",
                    "page",
                    "per_page",
                    "product_id",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/campaigns/{campaign_id}",
                "segments": [
                  {
                    "lit": "campaigns",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "campaigns",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "campaign_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "campaign_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "country": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "iso_code",
            "title": "Iso Code",
            "type": "`$STRING`",
            "req": True,
            "short": "Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format.",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "regions",
            "title": "Regions",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "country",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/countries",
                "segments": [
                  {
                    "lit": "countries",
                  },
                ],
                "parts": [
                  "countries",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 50,
                    },
                    {
                      "name": "service_id",
                      "orig": "service_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "subservice_id",
                      "orig": "subservice_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "page",
                    "per_page",
                    "service_id",
                    "subservice_id",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/countries/{country_iso_code}",
                "segments": [
                  {
                    "lit": "countries",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "countries",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "country_iso_code": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "country_iso_code",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "credit_party_benefit": {
        "fields": [
          {
            "name": "credit_party_identifier",
            "title": "Credit Party Identifier",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "page",
            "title": "Page",
            "type": "`$INTEGER`",
            "short": "Page number",
            "format": "int32",
          },
          {
            "name": "per_page",
            "title": "Per Page",
            "type": "`$INTEGER`",
            "short": "Number of records per page",
            "format": "int32",
          },
          {
            "name": "service_id",
            "title": "Service Id",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Service identifier.",
            "format": "int32",
          },
        ],
        "name": "credit_party_benefit",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/lookup/credit-party-benefits",
                "segments": [
                  {
                    "lit": "lookup",
                  },
                  {
                    "lit": "credit-party-benefits",
                  },
                ],
                "parts": [
                  "lookup",
                  "credit-party-benefits",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "credit_party_status": {
        "fields": [
          {
            "name": "activation_date",
            "title": "Activation Date",
            "type": "`$STRING`",
            "req": True,
            "short": "A `null` value denotes that credit party has not yet been activated on the actual network",
            "format": "date-time",
          },
          {
            "name": "credit_party_identifier",
            "title": "Credit Party Identifier",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "installation_date",
            "title": "Installation Date",
            "type": "`$STRING`",
            "req": True,
            "short": "A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed",
            "format": "date-time",
          },
          {
            "name": "service_id",
            "title": "Service Id",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Service identifier.",
            "format": "int32",
          },
        ],
        "name": "credit_party_status",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/lookup/credit-party-status",
                "segments": [
                  {
                    "lit": "lookup",
                  },
                  {
                    "lit": "credit-party-status",
                  },
                ],
                "parts": [
                  "lookup",
                  "credit-party-status",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "mobile_number": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "mobile_number",
            "title": "Mobile Number",
            "type": "`$STRING`",
            "req": True,
            "short": "Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format.",
          },
          {
            "name": "page",
            "title": "Page",
            "type": "`$INTEGER`",
            "short": "Page number",
            "format": "int32",
          },
          {
            "name": "per_page",
            "title": "Per Page",
            "type": "`$INTEGER`",
            "short": "Number of records per page",
            "format": "int32",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "mobile_number",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/lookup/mobile-number",
                "segments": [
                  {
                    "lit": "lookup",
                  },
                  {
                    "lit": "mobile-number",
                  },
                ],
                "parts": [
                  "lookup",
                  "mobile-number",
                ],
                "rename": {},
                "transform": {
                  "req": {
                    "mobile_number": "`reqdata`",
                  },
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/lookup/mobile-number/{mobile_number}",
                "segments": [
                  {
                    "lit": "lookup",
                  },
                  {
                    "lit": "mobile-number",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "lookup",
                  "mobile-number",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "mobile_number": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "mobile_number",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 50,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "page",
                    "per_page",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "operator": {
        "fields": [
          {
            "name": "country",
            "title": "Country",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Operator identifier.",
            "format": "int32",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "regions",
            "title": "Regions",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "operator",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/operators",
                "segments": [
                  {
                    "lit": "operators",
                  },
                ],
                "parts": [
                  "operators",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "country_iso_code",
                      "orig": "country_iso_code",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 50,
                    },
                    {
                      "name": "service_id",
                      "orig": "service_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "subservice_id",
                      "orig": "subservice_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "country_iso_code",
                    "page",
                    "per_page",
                    "service_id",
                    "subservice_id",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/operators/{operator_id}",
                "segments": [
                  {
                    "lit": "operators",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "operators",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "operator_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "operator_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "product": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "product",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/products",
                "segments": [
                  {
                    "lit": "products",
                  },
                ],
                "parts": [
                  "products",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "accept_language",
                      "orig": "accept_language",
                      "type": "`$STRING`",
                      "kind": "header",
                      "example": "es",
                    },
                  ],
                  "query": [
                    {
                      "name": "benefit_type",
                      "orig": "benefit_type",
                      "type": "`$ARRAY`",
                      "kind": "query",
                    },
                    {
                      "name": "country_iso_code",
                      "orig": "country_iso_code",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "operator_id",
                      "orig": "operator_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 50,
                    },
                    {
                      "name": "region",
                      "orig": "region",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "service_id",
                      "orig": "service_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "name",
                    },
                    {
                      "name": "subservice_id",
                      "orig": "subservice_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "tag",
                      "orig": "tag",
                      "type": "`$ARRAY`",
                      "kind": "query",
                    },
                    {
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
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
                    "type",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/products/{product_id}",
                "segments": [
                  {
                    "lit": "products",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "products",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "product_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "accept_language",
                      "orig": "accept_language",
                      "type": "`$STRING`",
                      "kind": "header",
                      "example": "es",
                    },
                  ],
                  "params": [
                    {
                      "name": "id",
                      "orig": "product_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "accept_language",
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "promotion": {
        "fields": [
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "end_date",
            "title": "End Date",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "operator",
            "title": "Operator",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "products",
            "title": "Products",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "start_date",
            "title": "Start Date",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "terms",
            "title": "Terms",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "promotion",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/promotions",
                "segments": [
                  {
                    "lit": "promotions",
                  },
                ],
                "parts": [
                  "promotions",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "accept_language",
                      "orig": "accept_language",
                      "type": "`$STRING`",
                      "kind": "header",
                      "example": "es",
                    },
                  ],
                  "query": [
                    {
                      "name": "country_iso_code",
                      "orig": "country_iso_code",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "operator_id",
                      "orig": "operator_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 50,
                    },
                    {
                      "name": "product_id",
                      "orig": "product_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "accept_language",
                    "country_iso_code",
                    "operator_id",
                    "page",
                    "per_page",
                    "product_id",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/promotions/{promotion_id}",
                "segments": [
                  {
                    "lit": "promotions",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "promotions",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "promotion_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "accept_language",
                      "orig": "accept_language",
                      "type": "`$STRING`",
                      "kind": "header",
                      "example": "es",
                    },
                  ],
                  "params": [
                    {
                      "name": "id",
                      "orig": "promotion_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "accept_language",
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "service": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Service identifier.",
            "format": "int32",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "subservices",
            "title": "Subservices",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "service",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/services",
                "segments": [
                  {
                    "lit": "services",
                  },
                ],
                "parts": [
                  "services",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "country_iso_code",
                      "orig": "country_iso_code",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 50,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "country_iso_code",
                    "page",
                    "per_page",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/services/{service_id}",
                "segments": [
                  {
                    "lit": "services",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "services",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "service_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "service_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "statement": {
        "fields": [
          {
            "name": "account_number",
            "title": "Account Number",
            "type": "`$STRING`",
            "req": True,
            "short": "Account number.",
          },
          {
            "name": "account_qualifier",
            "title": "Account Qualifier",
            "type": "`$STRING`",
          },
          {
            "name": "page",
            "title": "Page",
            "type": "`$INTEGER`",
            "short": "Page number",
            "format": "int32",
          },
          {
            "name": "per_page",
            "title": "Per Page",
            "type": "`$INTEGER`",
            "short": "Number of records per page",
            "format": "int32",
          },
          {
            "name": "product_id",
            "title": "Product Id",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Product identifier.",
            "format": "int32",
          },
        ],
        "name": "statement",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/lookup/statement-inquiry",
                "segments": [
                  {
                    "lit": "lookup",
                  },
                  {
                    "lit": "statement-inquiry",
                  },
                ],
                "parts": [
                  "lookup",
                  "statement-inquiry",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "transaction": {
        "fields": [
          {
            "name": "additional_identifier",
            "title": "Additional Identifier",
            "type": "`$OBJECT`",
            "short": "Additional details for a transaction.",
          },
          {
            "name": "adjusted_values",
            "title": "Adjusted Values",
            "type": "`$OBJECT`",
            "readOnly": True,
          },
          {
            "name": "auto_confirm",
            "title": "Auto Confirm",
            "type": "`$BOOLEAN`",
            "short": "Determines whether a transaction will be automatically confirmed upon creation or not.",
            "writeOnly": True,
          },
          {
            "name": "beneficiary",
            "title": "Beneficiary",
            "type": "`$OBJECT`",
            "short": "Beneficiary details for a transaction.",
          },
          {
            "name": "benefits",
            "title": "Benefits",
            "type": "`$ARRAY`",
            "readOnly": True,
          },
          {
            "name": "calculation_mode",
            "title": "Calculation Mode",
            "type": "`$ANY`",
          },
          {
            "name": "callback_url",
            "title": "Callback Url",
            "type": "`$STRING`",
            "short": "Transaction status updates will be sent to this endpoint.",
            "format": "uri",
          },
          {
            "name": "confirmation_date",
            "title": "Confirmation Date",
            "type": "`$STRING`",
            "readOnly": True,
            "format": "date-time",
          },
          {
            "name": "confirmation_expiration_date",
            "title": "Confirmation Expiration Date",
            "type": "`$STRING`",
            "readOnly": True,
            "format": "date-time",
          },
          {
            "name": "creation_date",
            "title": "Creation Date",
            "type": "`$STRING`",
            "readOnly": True,
            "format": "date-time",
          },
          {
            "name": "credit_party_identifier",
            "title": "Credit Party Identifier",
            "type": "`$OBJECT`",
            "short": "Receiving account details for a transaction.",
          },
          {
            "name": "debit_party_identifier",
            "title": "Debit Party Identifier",
            "type": "`$OBJECT`",
            "short": "Sending account details for a transaction.",
          },
          {
            "name": "destination",
            "title": "Destination",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Required for ranged value products and when `calculation_mode` is set to `DESTINATION_AMOUNT`",
            "writeOnly": True,
          },
          {
            "name": "external_id",
            "title": "External Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "readOnly": True,
          },
          {
            "name": "metadata",
            "title": "Metadata",
            "type": "`$OBJECT`",
            "short": "Optional metadata related to the transaction.",
          },
          {
            "name": "operator_reference",
            "title": "Operator Reference",
            "type": "`$STRING`",
            "readOnly": True,
          },
          {
            "name": "pin",
            "title": "Pin",
            "type": "`$OBJECT`",
            "req": True,
            "readOnly": True,
          },
          {
            "name": "prices",
            "title": "Prices",
            "type": "`$OBJECT`",
            "req": True,
            "readOnly": True,
          },
          {
            "name": "product",
            "title": "Product",
            "type": "`$ANY`",
          },
          {
            "name": "product_id",
            "title": "Product Id",
            "type": "`$STRING`",
            "req": True,
            "writeOnly": True,
          },
          {
            "name": "promotions",
            "title": "Promotions",
            "type": "`$ARRAY`",
            "readOnly": True,
          },
          {
            "name": "rates",
            "title": "Rates",
            "type": "`$ANY`",
          },
          {
            "name": "requested_values",
            "title": "Requested Values",
            "type": "`$OBJECT`",
            "readOnly": True,
          },
          {
            "name": "sender",
            "title": "Sender",
            "type": "`$OBJECT`",
            "short": "Sender details for a transaction.",
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Required for ranged value products and when `calculation_mode` is set to `SOURCE_AMOUNT`",
            "writeOnly": True,
          },
          {
            "name": "statement_identifier",
            "title": "Statement Identifier",
            "type": "`$OBJECT`",
            "short": "Qualifying statement details for a payment transaction.",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$OBJECT`",
            "readOnly": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "transaction",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/transactions/{transaction_id}/cancel",
                "segments": [
                  {
                    "lit": "transactions",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "cancel",
                  },
                ],
                "parts": [
                  "transactions",
                  "{id}",
                  "cancel",
                ],
                "rename": {
                  "param": {
                    "transaction_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "transaction_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "cancel",
                  "exist": [
                    "id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/async/transactions/{transaction_id}/confirm",
                "segments": [
                  {
                    "lit": "async",
                  },
                  {
                    "lit": "transactions",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "confirm",
                  },
                ],
                "parts": [
                  "async",
                  "transactions",
                  "{id}",
                  "confirm",
                ],
                "rename": {
                  "param": {
                    "transaction_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "transaction_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "confirm",
                  "exist": [
                    "id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/sync/transactions/{transaction_id}/confirm",
                "segments": [
                  {
                    "lit": "sync",
                  },
                  {
                    "lit": "transactions",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "confirm",
                  },
                ],
                "parts": [
                  "sync",
                  "transactions",
                  "{id}",
                  "confirm",
                ],
                "rename": {
                  "param": {
                    "transaction_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "transaction_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "confirm",
                  "exist": [
                    "id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/async/transactions",
                "segments": [
                  {
                    "lit": "async",
                  },
                  {
                    "lit": "transactions",
                  },
                ],
                "parts": [
                  "async",
                  "transactions",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/sync/transactions",
                "segments": [
                  {
                    "lit": "sync",
                  },
                  {
                    "lit": "transactions",
                  },
                ],
                "parts": [
                  "sync",
                  "transactions",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/transactions",
                "segments": [
                  {
                    "lit": "transactions",
                  },
                ],
                "parts": [
                  "transactions",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "country_iso_code",
                      "orig": "country_iso_code",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "credit_party_account_number",
                      "orig": "credit_party_account_number",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "credit_party_mobile_number",
                      "orig": "credit_party_mobile_number",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "external_id",
                      "orig": "external_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "from_date",
                      "orig": "from_date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "1970-01-01T00:00:00.000000Z",
                    },
                    {
                      "name": "operator_id",
                      "orig": "operator_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 50,
                    },
                    {
                      "name": "product_type",
                      "orig": "product_type",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "service_id",
                      "orig": "service_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "status_id",
                      "orig": "status_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "subservice_id",
                      "orig": "subservice_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "to_date",
                      "orig": "to_date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "2020-02-02T14:00:00.022220+08:00",
                    },
                  ],
                },
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
                    "to_date",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/transactions/{transaction_id}",
                "segments": [
                  {
                    "lit": "transactions",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "transactions",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "transaction_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "transaction_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
