# Dtone Lua SDK



The Lua SDK for the Dtone API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Balance()` — each with the same small set of operations (`list`, `load`, `create`, `update`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/dtone-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("dtone_sdk")

local client = sdk.new({
  apikey = os.getenv("DTONE_APIKEY"),
})
```

### 2. List balance records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local balances, err = client:Balance():list()
if err then error(err) end

for _, item in ipairs(balances) do
  print(item["id"], item["unit"])
end
```

### 3. Load a campaign

Campaign is nested under campaign, so provide the `campaign_id`.

```lua
local campaign, err = client:Campaign():load({ campaign_id = 1 })
if err then error(err) end
print(campaign)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local balances, err = client:Balance():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Balance():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
DTONE_TEST_LIVE=TRUE
DTONE_APIKEY=<your-key>
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### DtoneSDK

```lua
local sdk = require("dtone_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### DtoneSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Balance` | `(data) -> BalanceEntity` | Create a Balance entity instance. |
| `BenefitType` | `(data) -> BenefitTypeEntity` | Create a BenefitType entity instance. |
| `Campaign` | `(data) -> CampaignEntity` | Create a Campaign entity instance. |
| `Country` | `(data) -> CountryEntity` | Create a Country entity instance. |
| `CreditPartyBenefit` | `(data) -> CreditPartyBenefitEntity` | Create a CreditPartyBenefit entity instance. |
| `CreditPartyStatus` | `(data) -> CreditPartyStatusEntity` | Create a CreditPartyStatus entity instance. |
| `MobileNumberLookup` | `(data) -> MobileNumberLookupEntity` | Create a MobileNumberLookup entity instance. |
| `Operator` | `(data) -> OperatorEntity` | Create an Operator entity instance. |
| `Product` | `(data) -> ProductEntity` | Create a Product entity instance. |
| `Promotion` | `(data) -> PromotionEntity` | Create a Promotion entity instance. |
| `Service` | `(data) -> ServiceEntity` | Create a Service entity instance. |
| `StatementInquiry` | `(data) -> StatementInquiryEntity` | Create a StatementInquiry entity instance. |
| `Transaction` | `(data) -> TransactionEntity` | Create a Transaction entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local campaign, err = client:Campaign():load()
    if err then error(err) end
    -- campaign is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Balance

| Field | Description |
| --- | --- |
| `available` |  |
| `credit_limit` |  |
| `holding` |  |
| `id` |  |
| `unit` |  |
| `unit_type` |  |

Operations: List.

API path: `/balances`

#### BenefitType

| Field | Description |
| --- | --- |
| `name` |  |

Operations: List.

API path: `/benefit-types`

#### Campaign

| Field | Description |
| --- | --- |
| `description` |  |
| `end_date` |  |
| `id` |  |
| `products` |  |
| `start_date` |  |
| `terms` |  |
| `title` |  |

Operations: List, Load.

API path: `/campaigns`

#### Country

| Field | Description |
| --- | --- |
| `iso_code` | Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. |
| `name` |  |
| `regions` |  |

Operations: List, Load.

API path: `/countries`

#### CreditPartyBenefit

| Field | Description |
| --- | --- |
| `amount` | Remaining benefit amount. |
| `country` |  |
| `credit_party_identifier` |  |
| `expiration_date` | A `null` value denotes either no expiration applies or that the product benefit has not yet been activated. |
| `page` | Page number |
| `per_page` | Number of records per page |
| `service_id` | Service identifier. |
| `type` |  |
| `unit` |  |
| `unit_type` |  |

Operations: List.

API path: `/lookup/credit-party-benefits`

#### CreditPartyStatus

| Field | Description |
| --- | --- |
| `activation_date` | A `null` value denotes that credit party has not yet been activated on the actual network |
| `credit_party_identifier` |  |
| `installation_date` | A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed |
| `service_id` | Service identifier. |

Operations: Load.

API path: `/lookup/credit-party-status`

#### MobileNumberLookup

| Field | Description |
| --- | --- |
| `country` |  |
| `id` | Operator identifier. |
| `identified` | Indicates whether operator was identified as a direct match |
| `mobile_number` | Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format. |
| `name` |  |
| `page` | Page number |
| `per_page` | Number of records per page |
| `regions` |  |

Operations: List.

API path: `/lookup/mobile-number/{mobile_number}`

#### Operator

| Field | Description |
| --- | --- |
| `country` |  |
| `id` | Operator identifier. |
| `name` |  |
| `regions` |  |

Operations: List, Load.

API path: `/operators`

#### Product

| Field | Description |
| --- | --- |

Operations: List, Load.

API path: `/products`

#### Promotion

| Field | Description |
| --- | --- |
| `description` |  |
| `end_date` |  |
| `id` |  |
| `operator` |  |
| `products` |  |
| `start_date` |  |
| `terms` |  |
| `title` |  |

Operations: List, Load.

API path: `/promotions`

#### Service

| Field | Description |
| --- | --- |
| `id` | Service identifier. |
| `name` |  |
| `subservices` |  |

Operations: List, Load.

API path: `/services`

#### StatementInquiry

| Field | Description |
| --- | --- |
| `account_number` | Account number. |
| `account_qualifier` |  |
| `balance` |  |
| `dates` |  |
| `page` | Page number |
| `per_page` | Number of records per page |
| `product_id` | Product identifier. |
| `reference` |  |

Operations: List.

API path: `/lookup/statement-inquiry`

#### Transaction

| Field | Description |
| --- | --- |
| `additional_identifier` | Additional details for a transaction. |
| `adjusted_values` |  |
| `auto_confirm` | Determines whether a transaction will be automatically confirmed upon creation or not. |
| `beneficiary` | Beneficiary details for a transaction. |
| `benefits` |  |
| `calculation_mode` |  |
| `callback_url` | Transaction status updates will be sent to this endpoint. |
| `confirmation_date` |  |
| `confirmation_expiration_date` |  |
| `creation_date` |  |
| `credit_party_identifier` | Receiving account details for a transaction. |
| `debit_party_identifier` | Sending account details for a transaction. |
| `destination` | Required for ranged value products and when `calculation_mode` is set to `DESTINATION_AMOUNT` |
| `external_id` |  |
| `id` |  |
| `metadata` | Optional metadata related to the transaction. |
| `operator_reference` |  |
| `pin` |  |
| `prices` |  |
| `product` |  |
| `product_id` |  |
| `promotions` |  |
| `rates` |  |
| `requested_values` |  |
| `sender` | Sender details for a transaction. |
| `source` | Required for ranged value products and when `calculation_mode` is set to `SOURCE_AMOUNT` |
| `statement_identifier` | Qualifying statement details for a payment transaction. |
| `status` |  |

Operations: Create, List, Load, Update.

API path: `/async/transactions`



## Entities


### Balance

Create an instance: `local balance = client:Balance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `number` |  |
| `credit_limit` | `number` |  |
| `holding` | `number` |  |
| `id` | `number` |  |
| `unit` | `string` |  |
| `unit_type` | `string` |  |

#### Example: List

```lua
local balances, err = client:Balance():list()
```


### BenefitType

Create an instance: `local benefit_type = client:BenefitType(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |

#### Example: List

```lua
local benefit_types, err = client:BenefitType():list()
```


### Campaign

Create an instance: `local campaign = client:Campaign(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `end_date` | `string` |  |
| `id` | `number` |  |
| `products` | `table` |  |
| `start_date` | `string` |  |
| `terms` | `string` |  |
| `title` | `string` |  |

#### Example: Load

```lua
local campaign, err = client:Campaign():load({ campaign_id = 1 })
```

#### Example: List

```lua
local campaigns, err = client:Campaign():list()
```


### Country

Create an instance: `local country = client:Country(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `iso_code` | `string` | Country code in [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) format. |
| `name` | `string` |  |
| `regions` | `table` |  |

#### Example: Load

```lua
local country, err = client:Country():load({ country_iso_code = "country_iso_code" })
```

#### Example: List

```lua
local countrys, err = client:Country():list()
```


### CreditPartyBenefit

Create an instance: `local credit_party_benefit = client:CreditPartyBenefit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` | Remaining benefit amount. |
| `country` | `table` |  |
| `credit_party_identifier` | `table` |  |
| `expiration_date` | `string` | A `null` value denotes either no expiration applies or that the product benefit has not yet been activated. |
| `page` | `number` | Page number |
| `per_page` | `number` | Number of records per page |
| `service_id` | `number` | Service identifier. |
| `type` | `string` |  |
| `unit` | `string` |  |
| `unit_type` | `string` |  |

#### Example: List

```lua
local credit_party_benefits, err = client:CreditPartyBenefit():list()
```


### CreditPartyStatus

Create an instance: `local credit_party_status = client:CreditPartyStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activation_date` | `string` | A `null` value denotes that credit party has not yet been activated on the actual network |
| `credit_party_identifier` | `table` |  |
| `installation_date` | `string` | A `null` value denotes either the concept of installation does not apply for the given credit party or that the credit party has not yet been installed |
| `service_id` | `number` | Service identifier. |

#### Example: Load

```lua
local credit_party_status, err = client:CreditPartyStatus():load()
```


### MobileNumberLookup

Create an instance: `local mobile_number_lookup = client:MobileNumberLookup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `table` |  |
| `id` | `number` | Operator identifier. |
| `identified` | `boolean` | Indicates whether operator was identified as a direct match |
| `mobile_number` | `string` | Mobile number in [E.164](https://en.wikipedia.org/wiki/E.164) format. |
| `name` | `string` |  |
| `page` | `number` | Page number |
| `per_page` | `number` | Number of records per page |
| `regions` | `table` |  |

#### Example: List

```lua
local mobile_number_lookups, err = client:MobileNumberLookup():list()
```


### Operator

Create an instance: `local operator = client:Operator(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `table` |  |
| `id` | `number` | Operator identifier. |
| `name` | `string` |  |
| `regions` | `table` |  |

#### Example: Load

```lua
local operator, err = client:Operator():load({ operator_id = 1 })
```

#### Example: List

```lua
local operators, err = client:Operator():list()
```


### Product

Create an instance: `local product = client:Product(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local product, err = client:Product():load({ product_id = 1 })
```

#### Example: List

```lua
local products, err = client:Product():list()
```


### Promotion

Create an instance: `local promotion = client:Promotion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `end_date` | `string` |  |
| `id` | `number` |  |
| `operator` | `table` |  |
| `products` | `table` |  |
| `start_date` | `string` |  |
| `terms` | `string` |  |
| `title` | `string` |  |

#### Example: Load

```lua
local promotion, err = client:Promotion():load({ promotion_id = 1 })
```

#### Example: List

```lua
local promotions, err = client:Promotion():list()
```


### Service

Create an instance: `local service = client:Service(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Service identifier. |
| `name` | `string` |  |
| `subservices` | `table` |  |

#### Example: Load

```lua
local service, err = client:Service():load({ service_id = 1 })
```

#### Example: List

```lua
local services, err = client:Service():list()
```


### StatementInquiry

Create an instance: `local statement_inquiry = client:StatementInquiry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_number` | `string` | Account number. |
| `account_qualifier` | `string` |  |
| `balance` | `table` |  |
| `dates` | `table` |  |
| `page` | `number` | Page number |
| `per_page` | `number` | Number of records per page |
| `product_id` | `number` | Product identifier. |
| `reference` | `any` |  |

#### Example: List

```lua
local statement_inquirys, err = client:StatementInquiry():list()
```


### Transaction

Create an instance: `local transaction = client:Transaction(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `additional_identifier` | `table` | Additional details for a transaction. |
| `adjusted_values` | `table` |  |
| `auto_confirm` | `boolean` | Determines whether a transaction will be automatically confirmed upon creation or not. |
| `beneficiary` | `table` | Beneficiary details for a transaction. |
| `benefits` | `table` |  |
| `calculation_mode` | `any` |  |
| `callback_url` | `string` | Transaction status updates will be sent to this endpoint. |
| `confirmation_date` | `string` |  |
| `confirmation_expiration_date` | `string` |  |
| `creation_date` | `string` |  |
| `credit_party_identifier` | `table` | Receiving account details for a transaction. |
| `debit_party_identifier` | `table` | Sending account details for a transaction. |
| `destination` | `table` | Required for ranged value products and when `calculation_mode` is set to `DESTINATION_AMOUNT` |
| `external_id` | `string` |  |
| `id` | `string` |  |
| `metadata` | `table` | Optional metadata related to the transaction. |
| `operator_reference` | `string` |  |
| `pin` | `table` |  |
| `prices` | `table` |  |
| `product` | `any` |  |
| `product_id` | `string` |  |
| `promotions` | `table` |  |
| `rates` | `any` |  |
| `requested_values` | `table` |  |
| `sender` | `table` | Sender details for a transaction. |
| `source` | `table` | Required for ranged value products and when `calculation_mode` is set to `SOURCE_AMOUNT` |
| `statement_identifier` | `table` | Qualifying statement details for a payment transaction. |
| `status` | `table` |  |

#### Example: Load

```lua
local transaction, err = client:Transaction():load({ transaction_id = 1 })
```

#### Example: List

```lua
local transactions, err = client:Transaction():list()
```

#### Example: Create

```lua
local transaction, err = client:Transaction():create({
  destination = {}, -- table
  external_id = "example_external_id", -- string
  pin = {}, -- table
  prices = {}, -- table
  product_id = "example_product_id", -- string
  source = {}, -- table
})
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── dtone_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`dtone_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local balance = client:Balance()
balance:list()

-- balance:data_get() now returns the balance data from the last list
-- balance:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
