-- Dtone SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Dtone",
      slug = "dtone",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://preprod-dvs-api.dtone.com/v1",
      auth = {
        prefix = "Basic",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["balance"] = {},
        ["benefit_type"] = {},
        ["campaign"] = {},
        ["country"] = {},
        ["credit_party_benefit"] = {},
        ["credit_party_status"] = {},
        ["mobile_number_lookup"] = {},
        ["operator"] = {},
        ["product"] = {},
        ["promotion"] = {},
        ["service"] = {},
        ["statement_inquiry"] = {},
        ["transaction"] = {},
      },
    },
    entity = {
      ["balance"] = {
        ["fields"] = {
          {
            ["name"] = "available",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "credit_limit",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "holding",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "unit",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "unit_type",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "balance",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 50,
                      ["kind"] = "query",
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "unit",
                      ["orig"] = "unit",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "unit_type",
                      ["orig"] = "unit_type",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/balances",
                ["parts"] = {
                  "balances",
                },
                ["select"] = {
                  ["exist"] = {
                    "page",
                    "per_page",
                    "unit",
                    "unit_type",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["benefit_type"] = {
        ["fields"] = {
          {
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "benefit_type",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 50,
                      ["kind"] = "query",
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/benefit-types",
                ["parts"] = {
                  "benefit-types",
                },
                ["select"] = {
                  ["exist"] = {
                    "page",
                    "per_page",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["campaign"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "end_date",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "products",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "start_date",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "terms",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "campaign",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "country_iso_code",
                      ["orig"] = "country_iso_code",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "operator_id",
                      ["orig"] = "operator_id",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 50,
                      ["kind"] = "query",
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "product_id",
                      ["orig"] = "product_id",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/campaigns",
                ["parts"] = {
                  "campaigns",
                },
                ["select"] = {
                  ["exist"] = {
                    "country_iso_code",
                    "operator_id",
                    "page",
                    "per_page",
                    "product_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "campaign_id",
                      ["orig"] = "campaign_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/campaigns/{campaign_id}",
                ["parts"] = {
                  "campaigns",
                  "{campaign_id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "campaign_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "campaign",
            },
          },
        },
      },
      ["country"] = {
        ["fields"] = {
          {
            ["name"] = "iso_code",
            ["req"] = true,
            ["short"] = "Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "regions",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "country",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 50,
                      ["kind"] = "query",
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "service_id",
                      ["orig"] = "service_id",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "subservice_id",
                      ["orig"] = "subservice_id",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/countries",
                ["parts"] = {
                  "countries",
                },
                ["select"] = {
                  ["exist"] = {
                    "page",
                    "per_page",
                    "service_id",
                    "subservice_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "country_iso_code",
                      ["orig"] = "country_iso_code",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/countries/{country_iso_code}",
                ["parts"] = {
                  "countries",
                  "{country_iso_code}",
                },
                ["select"] = {
                  ["exist"] = {
                    "country_iso_code",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "country",
            },
          },
        },
      },
      ["credit_party_benefit"] = {
        ["fields"] = {
          {
            ["name"] = "amount",
            ["req"] = true,
            ["short"] = "Remaining benefit amount.",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "country",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "credit_party_identifier",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "expiration_date",
            ["req"] = true,
            ["short"] = "A `null` value denotes either no expiration applies or that the product benefit has not yet been activated.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "page",
            ["short"] = "Page number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "per_page",
            ["short"] = "Number of records per page",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "service_id",
            ["req"] = true,
            ["short"] = "Service identifier.",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "type",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "unit",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "unit_type",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "credit_party_benefit",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/lookup/credit-party-benefits",
                ["parts"] = {
                  "lookup",
                  "credit-party-benefits",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["credit_party_status"] = {
        ["fields"] = {
          {
            ["name"] = "activation_date",
            ["req"] = true,
            ["short"] = "A `null` value denotes that credit party has not yet been activated on the actual network",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "credit_party_identifier",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "installation_date",
            ["req"] = true,
            ["short"] = "A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "service_id",
            ["req"] = true,
            ["short"] = "Service identifier.",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "credit_party_status",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/lookup/credit-party-status",
                ["parts"] = {
                  "lookup",
                  "credit-party-status",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["mobile_number_lookup"] = {
        ["fields"] = {
          {
            ["name"] = "country",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["short"] = "Operator identifier.",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "identified",
            ["req"] = true,
            ["short"] = "Indicates whether operator was identified as a direct match",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "mobile_number",
            ["req"] = true,
            ["short"] = "Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "page",
            ["short"] = "Page number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "per_page",
            ["short"] = "Number of records per page",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "regions",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "mobile_number_lookup",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "mobile_number",
                      ["orig"] = "mobile_number",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 50,
                      ["kind"] = "query",
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/lookup/mobile-number/{mobile_number}",
                ["parts"] = {
                  "lookup",
                  "mobile-number",
                  "{mobile_number}",
                },
                ["select"] = {
                  ["exist"] = {
                    "mobile_number",
                    "page",
                    "per_page",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/lookup/mobile-number",
                ["parts"] = {
                  "lookup",
                  "mobile-number",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "mobile_number",
            },
          },
        },
      },
      ["operator"] = {
        ["fields"] = {
          {
            ["name"] = "country",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["short"] = "Operator identifier.",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "regions",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "operator",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "country_iso_code",
                      ["orig"] = "country_iso_code",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 50,
                      ["kind"] = "query",
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "service_id",
                      ["orig"] = "service_id",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "subservice_id",
                      ["orig"] = "subservice_id",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/operators",
                ["parts"] = {
                  "operators",
                },
                ["select"] = {
                  ["exist"] = {
                    "country_iso_code",
                    "page",
                    "per_page",
                    "service_id",
                    "subservice_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "operator_id",
                      ["orig"] = "operator_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/operators/{operator_id}",
                ["parts"] = {
                  "operators",
                  "{operator_id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "operator_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "operator",
            },
          },
        },
      },
      ["product"] = {
        ["fields"] = {},
        ["name"] = "product",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["header"] = {
                    {
                      ["example"] = "es",
                      ["kind"] = "header",
                      ["name"] = "accept_language",
                      ["orig"] = "accept_language",
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "benefit_type",
                      ["orig"] = "benefit_type",
                      ["type"] = "`$ARRAY`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "country_iso_code",
                      ["orig"] = "country_iso_code",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "operator_id",
                      ["orig"] = "operator_id",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 50,
                      ["kind"] = "query",
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "region",
                      ["orig"] = "region",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "service_id",
                      ["orig"] = "service_id",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "name",
                      ["kind"] = "query",
                      ["name"] = "sort",
                      ["orig"] = "sort",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "subservice_id",
                      ["orig"] = "subservice_id",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "tag",
                      ["orig"] = "tag",
                      ["type"] = "`$ARRAY`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/products",
                ["parts"] = {
                  "products",
                },
                ["select"] = {
                  ["exist"] = {
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
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["header"] = {
                    {
                      ["example"] = "es",
                      ["kind"] = "header",
                      ["name"] = "accept_language",
                      ["orig"] = "accept_language",
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "product_id",
                      ["orig"] = "product_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/products/{product_id}",
                ["parts"] = {
                  "products",
                  "{product_id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "accept_language",
                    "product_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "product",
            },
          },
        },
      },
      ["promotion"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "end_date",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "operator",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "products",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "start_date",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "terms",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "promotion",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["header"] = {
                    {
                      ["example"] = "es",
                      ["kind"] = "header",
                      ["name"] = "accept_language",
                      ["orig"] = "accept_language",
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "country_iso_code",
                      ["orig"] = "country_iso_code",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "operator_id",
                      ["orig"] = "operator_id",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 50,
                      ["kind"] = "query",
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "product_id",
                      ["orig"] = "product_id",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/promotions",
                ["parts"] = {
                  "promotions",
                },
                ["select"] = {
                  ["exist"] = {
                    "accept_language",
                    "country_iso_code",
                    "operator_id",
                    "page",
                    "per_page",
                    "product_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["header"] = {
                    {
                      ["example"] = "es",
                      ["kind"] = "header",
                      ["name"] = "accept_language",
                      ["orig"] = "accept_language",
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "promotion_id",
                      ["orig"] = "promotion_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/promotions/{promotion_id}",
                ["parts"] = {
                  "promotions",
                  "{promotion_id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "accept_language",
                    "promotion_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "promotion",
            },
          },
        },
      },
      ["service"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["req"] = true,
            ["short"] = "Service identifier.",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "subservices",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "service",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "country_iso_code",
                      ["orig"] = "country_iso_code",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 50,
                      ["kind"] = "query",
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/services",
                ["parts"] = {
                  "services",
                },
                ["select"] = {
                  ["exist"] = {
                    "country_iso_code",
                    "page",
                    "per_page",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "service_id",
                      ["orig"] = "service_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/services/{service_id}",
                ["parts"] = {
                  "services",
                  "{service_id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "service_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "service",
            },
          },
        },
      },
      ["statement_inquiry"] = {
        ["fields"] = {
          {
            ["name"] = "account_number",
            ["req"] = true,
            ["short"] = "Account number.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "account_qualifier",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "balance",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "dates",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "page",
            ["short"] = "Page number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "per_page",
            ["short"] = "Number of records per page",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "product_id",
            ["req"] = true,
            ["short"] = "Product identifier.",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "reference",
            ["req"] = true,
            ["type"] = "`$ANY`",
          },
        },
        ["name"] = "statement_inquiry",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/lookup/statement-inquiry",
                ["parts"] = {
                  "lookup",
                  "statement-inquiry",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["transaction"] = {
        ["fields"] = {
          {
            ["name"] = "additional_identifier",
            ["short"] = "Additional details for a transaction.",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "adjusted_values",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "auto_confirm",
            ["short"] = "Determines whether a transaction will be automatically confirmed upon creation or not.",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "beneficiary",
            ["short"] = "Beneficiary details for a transaction.",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "benefits",
            ["type"] = "`$ARRAY`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 1,
              ["depth"] = 1,
            },
          },
          {
            ["name"] = "calculation_mode",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "callback_url",
            ["short"] = "Transaction status updates will be sent to this endpoint.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "confirmation_date",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "confirmation_expiration_date",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "creation_date",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "credit_party_identifier",
            ["short"] = "Receiving account details for a transaction.",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "debit_party_identifier",
            ["short"] = "Sending account details for a transaction.",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "destination",
            ["req"] = true,
            ["short"] = "Required for ranged value products and when `calculation_mode` is set to `DESTINATION_AMOUNT`",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "external_id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "metadata",
            ["short"] = "Optional metadata related to the transaction.",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "operator_reference",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "pin",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "prices",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "product",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "product_id",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "promotions",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "rates",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "requested_values",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "sender",
            ["short"] = "Sender details for a transaction.",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "source",
            ["req"] = true,
            ["short"] = "Required for ranged value products and when `calculation_mode` is set to `SOURCE_AMOUNT`",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "statement_identifier",
            ["short"] = "Qualifying statement details for a payment transaction.",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "status",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "transaction",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/async/transactions",
                ["parts"] = {
                  "async",
                  "transactions",
                },
                ["select"] = {
                  ["$action"] = "asyncCreate",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/sync/transactions",
                ["parts"] = {
                  "sync",
                  "transactions",
                },
                ["select"] = {
                  ["$action"] = "syncCreate",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "country_iso_code",
                      ["orig"] = "country_iso_code",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "credit_party_account_number",
                      ["orig"] = "credit_party_account_number",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "credit_party_mobile_number",
                      ["orig"] = "credit_party_mobile_number",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "external_id",
                      ["orig"] = "external_id",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "1970-01-01T00:00:00.000000Z",
                      ["kind"] = "query",
                      ["name"] = "from_date",
                      ["orig"] = "from_date",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "operator_id",
                      ["orig"] = "operator_id",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 50,
                      ["kind"] = "query",
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "product_type",
                      ["orig"] = "product_type",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "service_id",
                      ["orig"] = "service_id",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "status_id",
                      ["orig"] = "status_id",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "subservice_id",
                      ["orig"] = "subservice_id",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "2020-02-02T14:00:00.022220+08:00",
                      ["kind"] = "query",
                      ["name"] = "to_date",
                      ["orig"] = "to_date",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/transactions",
                ["parts"] = {
                  "transactions",
                },
                ["select"] = {
                  ["exist"] = {
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
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "transaction_id",
                      ["orig"] = "transaction_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/transactions/{transaction_id}",
                ["parts"] = {
                  "transactions",
                  "{transaction_id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "transaction_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "transaction_id",
                      ["orig"] = "transaction_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/transactions/{transaction_id}/cancel",
                ["parts"] = {
                  "transactions",
                  "{transaction_id}",
                  "cancel",
                },
                ["select"] = {
                  ["$action"] = "cancel",
                  ["exist"] = {
                    "transaction_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "transaction_id",
                      ["orig"] = "transaction_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/async/transactions/{transaction_id}/confirm",
                ["parts"] = {
                  "async",
                  "transactions",
                  "{transaction_id}",
                  "confirm",
                },
                ["select"] = {
                  ["$action"] = "confirmAsync",
                  ["exist"] = {
                    "transaction_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "transaction_id",
                      ["orig"] = "transaction_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/sync/transactions/{transaction_id}/confirm",
                ["parts"] = {
                  "sync",
                  "transactions",
                  "{transaction_id}",
                  "confirm",
                },
                ["select"] = {
                  ["$action"] = "confirmSync",
                  ["exist"] = {
                    "transaction_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "transaction",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
